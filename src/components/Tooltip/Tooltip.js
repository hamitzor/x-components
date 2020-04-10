import React, { useState, useEffect } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

const propValues = {
    position: ['top', 'left', 'bottom', 'right']
};

const useStyles = createUseStyles(theme => ({
    tooltip: {
        fontSize: theme.fontSizes.small,
        color: theme.textColors[theme.darkOrLight('normal', 'reversed')],
        position: 'fixed',
        top: ({ top }) => top,
        left: ({ left }) => left,
        backgroundColor: theme.type === 'dark' ? 'rgba(36, 36, 36, 0.8)' : 'rgba(70, 70, 70, 0.7)',
        borderRadius: 3,
        padding: '4px 8px',
        maxWidth: 200,
        textAlign: 'center'
    },
    enter: {
        opacity: 0,
    },
    enterActive: {
        opacity: 1,
        transition: theme.transition(['opacity'])
    },
    exit: {
        opacity: 1,
    },
    exitActive: {
        opacity: 0,
        transition: theme.transition(['opacity'])
    },
}));

const Tooltip = React.forwardRef((props, ref) => {
    const { children, className, position, animated, text, ...others } = props;
    const [ready, setReady] = useState(false);
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [visible, setVisible] = useState(false);
    const [tooltipWidth, setTooltipWidth] = useState(0);
    const [tooltipHeight, setTooltipHeight] = useState(0);
    const [anchorRef, setAnchorRef] = useState(null);
    const classes = useStyles({ top, left });
    
    if (!ref)
        ref = React.createRef();

    useEffect(() => {
        setReady(false);
    }, [props.className, props.text]);

    useEffect(() => {
        if (!ready) {
            setTooltipWidth(ref.current.offsetWidth);
            setTooltipHeight(ref.current.offsetHeight);
            setReady(true);
        }
    }, [ready]);

    useEffect(() => {
        if (visible) {
            const { top, height, left, width } = anchorRef.getBoundingClientRect();
            let calcTop, calcLeft;
            if (position === 'bottom' || position === 'top')
                calcLeft = left + (width - tooltipWidth) / 2;
            else
                calcTop = top + (height - tooltipHeight) / 2;

            if (position === 'bottom')
                calcTop = top + height + 10;
            else if (position === 'top')
                calcTop = top - tooltipHeight - 10;
            else if (position === 'left')
                calcLeft = left - tooltipWidth - 10;
            else
                calcLeft = left + width + 10;

            setTop(calcTop);
            setLeft(calcLeft);
        }
    }, [visible]);

    const tooltip = (
        <div className={classnames(classes.tooltip, className)} ref={ref} {...others} >
            {text}
        </div>
    );

    return (
        <React.Fragment>
            {React.cloneElement(
                props.children,
                {
                    onMouseOver: e => {
                        setAnchorRef(e.currentTarget);
                        setVisible(true);
                        if (props.children.props.onMouseOver)
                            props.children.props.onMouseOver(e);
                    },
                    onMouseLeave: () => {
                        setVisible(false);
                        if (props.children.props.onMouseLeave)
                            props.children.props.onMouseLeave(e);
                    }
                })}
            {ready ?
                <CSSTransition
                    in={visible}
                    timeout={100}
                    unmountOnExit
                    classNames={{ enter: classes.enter, enterActive: classes.enterActive, exit: classes.exit, exitActive: classes.exitActive }}>
                    {tooltip}
                </CSSTransition> : tooltip}
        </React.Fragment>
    );
});

Tooltip.propTypes = {
    children: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    position: PropTypes.oneOf(propValues.position),
};

Tooltip.defaultProps = {
    className: '',
    position: 'bottom',
};

export { Tooltip, propValues };