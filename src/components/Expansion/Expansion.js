import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from 'react-jss';
import { CSSTransition } from 'react-transition-group';
import Icon from '../Icon';
import Button from '../Button';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import classnames from 'classnames';

const propValues = {
    color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
    type: ['default', 'filled', 'transparent'],
};

const useStyles = createUseStyles(theme => ({
    expansion: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    unready: {
        visibility: 'hidden'
    },
    content: {
        justifyContent: 'space-between'
    },
    icon: {
        fontSize: 16,
    },
    iconEnter: {
        ...theme.transform('rotate(0deg)'),
        transition: theme.transition()
    },
    iconEnterActive: {
        ...theme.transform('rotate(180deg)'),
    },
    iconEnterDone: {
        ...theme.transform('rotate(180deg)'),
    },
    iconExit: {
        ...theme.transform('rotate(180deg)'),
        transition: theme.transition()
    },
    iconExitActive: {
        ...theme.transform('rotate(0deg)'),
    },
    iconExitDone: {
        ...theme.transform('rotate(0deg)'),
    },
    animatedContent: {
        overflow: 'hidden'
    },
    enter: {
        height: '0px',
    },
    enterActive: {
        height: ({ calculatedHeight }) => calculatedHeight,
        transition: theme.transition(['height'])
    },
    exit: {
        height: ({ calculatedHeight }) => calculatedHeight,
    },
    exitActive: {
        height: '0px!important',
        transition: theme.transition(['height'])
    }
}));

const Expansion = React.forwardRef((props, ref) => {
    const { children, className, type, color, label, animate, rounded, onChange, ...others } = props;
    const [open, setOpen] = useState(false);
    const [ready, setReady] = useState(false);
    const [busy, setBusy] = useState(false);
    const [calculatedHeight, setCalculatedHeight] = useState(undefined);
    const contentRef = React.createRef();
    const classes = useStyles({ calculatedHeight });
    const theme = useTheme();

    useEffect(() => {
        setOpen(props.open);
        setReady(true);
        setCalculatedHeight(contentRef.current.offsetHeight);
    }, []);

    return (
        <div ref={ref} className={classnames(classes.expansion, { [classes.unready]: !ready }, className)} {...others}>
            <Button
                onClick={e => {
                    if (onChange)
                        onChange(e, busy ? open : !open);
                    setOpen(busy ? open : !open);
                }}
                justify='space-between'
                type={type}
                rounded={rounded}
                className={classes.toggle}
                color={color}>
                {label}
                <Icon>
                    {animate ?
                        <CSSTransition
                            in={open}
                            timeout={theme.animationDuration}
                            classNames={{
                                enter: classes.iconEnter,
                                enterActive: classes.iconEnterActive,
                                enterDone: classes.iconEnterDone,
                                exit: classes.iconExit,
                                exitActive: classes.iconExitActive,
                                exitDone: classes.iconExitDone
                            }}
                            onEnter={() => setBusy(true)}
                            onEntered={() => setBusy(false)}
                            onExit={() => setBusy(true)}
                            onExited={() => setBusy(false)}>
                            <IoIosArrowDown className={classes.icon} />
                        </CSSTransition> : open ? <IoIosArrowUp className={classes.icon} /> : <IoIosArrowDown className={classes.icon} />}
                </Icon>
            </Button>
            {ready ? animate ?
                <CSSTransition
                    in={open}
                    timeout={theme.animationDuration}
                    unmountOnExit
                    classNames={{
                        enter: classes.enter,
                        enterActive: classes.enterActive,
                        exit: classes.exit,
                        exitActive: classes.exitActive
                    }}>
                    <div className={classes.animatedContent}>
                        {children}
                    </div>
                </CSSTransition> : open && <div ref={contentRef}>{children}</div> : <div ref={contentRef}>{children}</div>}
        </div>
    );
});

Expansion.propTypes = {
    children: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(propValues.type),
    color: PropTypes.oneOf(propValues.color),
    rounded: PropTypes.bool,
    animate: PropTypes.bool,
    onChange: PropTypes.func,
    open: PropTypes.bool,
};

Expansion.defaultProps = {
    className: '',
    type: 'filled',
    color: 'primary',
    rounded: true,
    animate: true,
    onChange: () => null,
    open: false
};

export { Expansion, propValues };