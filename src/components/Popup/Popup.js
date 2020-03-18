import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { createUseStyles } from 'react-jss';
import { breakpoints } from '../../theme';
import { childrenValidator } from '../../util';
import PopupBody from '../PopupBody';
import PopupHeader from '../PopupHeader';
import PopupFooter from '../PopupFooter';
import HideBodyScrollbar from '../HideBodyScrollbar';
import Panel from '../Panel';

const propValues = {
    width: [...breakpoints.filter(x => x !== 'xs'), 'maxContent']
};

const widthClasses = theme => propValues.width.reduce((acc, width) => ({
    ...acc,
    [`${width}Width`]: {
        width: width === 'maxContent' ? undefined : theme.breakpointValues[width]
    }
}), {});

const duration = 200;

const useStyles = createUseStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        overflow: 'auto',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: theme.z.Popup,
    },
    enter: {
        opacity: 0,
        transition: theme.transition(['opacity'], duration),
        '& $popup:not(.fullScreen)': {
            transform: 'scale(0.9,0.9)'
        }
    },
    enterActive: {
        opacity: 1,
        '& $popup:not(.fullScreen)': {
            transform: 'scale(1,1)'
        }
    },
    exit: {
        opacity: 1,
        transition: theme.transition(['opacity'], duration),
        '& $popup:not(.fullScreen)': {
            transform: 'scale(1,1)'
        }
    },
    exitActive: {
        opacity: 0,
        '& $popup:not(.fullScreen)': {
            transform: 'scale(0.9,0.9)'
        }
    },
    ...widthClasses(theme),
    popup: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        transition: theme.transition(['transform'], duration),
        transformOrigin: 'center top',
    },
    fullWidth: {
        width: '100%'
    },
    fullScreen: {
        marginTop: 0,
        marginBottom: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    body: {
        padding: `${theme.unit * 2}px ${theme.unit * 3}px`,
        paddingTop: 0
    },
    fullScreenBody: {
        padding: `${theme.unit * 3}px ${theme.unit * 5}px`,
        flex: 1,
        overflow: 'auto'
    },
    footer: {
        padding: `${theme.unit * 2}px ${theme.unit * 3}px`,
        paddingTop: 0
    },
    fullScreenFooter: {
        paddingTop: theme.unit * 2,
        paddingBottom: theme.unit * 2,
        paddingRight: theme.unit * 4,
        paddingLeft: theme.unit * 4
    }
}));

const Popup = React.forwardRef((props, ref) => {
    const { children, className, open, width, fullWidth, fullScreen, animate, onClose, ...others } = props;
    if (!ref)
        ref = React.createRef();
    const classes = useStyles();

    const resolveChildren = children => {
        const result = {};
        React.Children.forEach(children, child => {
            if (child)
                if (child.type === PopupHeader)
                    result.header = child;
                else if (child.type === PopupBody) {
                    result.body = child;
                }
                else {
                    result.footer = child;
                }
        });
        return result;
    };

    const { header, body, footer } = resolveChildren(children);

    const root = (
        <div {...others} className={classnames(classes.root, className)} onClick={e => e.target === ref.current && props.onClose(e)} ref={ref}>
            <HideBodyScrollbar />
            <Panel
                padding={false}
                rounded={!fullScreen}
                className={classnames(
                    classes.popup,
                    classes[`${width}Width`],
                    {
                        [classes.fullWidth]: fullWidth,
                        [classes.fullScreen]: fullScreen,
                        fullScreen: fullScreen
                    })}>
                <div>{header && React.cloneElement(header, { full: fullScreen })}</div>
                <div className={classnames(classes.body, { [classes.fullScreenBody]: fullScreen })}>{body}</div>
                <div className={classnames(classes.footer, { [classes.fullScreenFooter]: fullScreen })}>{footer}</div>
            </Panel>
        </div>
    );

    return animate ?
        <CSSTransition
            in={open}
            unmountOnExit
            timeout={duration}
            classNames={{
                enter: classes.enter,
                enterActive: classes.enterActive,
                exit: classes.exit,
                exitActive: classes.exitActive,
            }}>
            {root}
        </CSSTransition> : open && root;
});

Popup.propTypes = {
    children: childrenValidator([{ type: PopupBody, max: 1 }, { type: PopupHeader, max: 1 }, { type: PopupFooter, max: 1 }]),
    className: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    width: PropTypes.oneOf(propValues.width),
    fullWidth: PropTypes.bool,
    fullScreen: PropTypes.bool,
    animate: PropTypes.bool,
};

Popup.defaultProps = {
    className: '',
    open: false,
    width: 'sm',
    fullWidth: false,
    fullScreen: false,
    animate: true
};

export { Popup, propValues };