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
        position: 'absolute',
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
        transition: theme.transition()
    },
    exit: {
        opacity: 1,
    },
    exitActive: {
        opacity: 0,
        transition: theme.transition()
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
    const anchorRef = React.createRef();
    if (!ref)
        ref = React.createRef();
    const classes = useStyles({ top, left });

    useEffect(() => {
        anchorRef.current.addEventListener('mouseenter', () => {
            setVisible(true);
        });
        anchorRef.current.addEventListener('mouseleave', () => {
            setVisible(false);
        });
        setTooltipWidth(ref.current.offsetWidth);
        setTooltipHeight(ref.current.offsetHeight);
    }, []);

    useEffect(() => {
        const { offsetTop, offsetHeight, offsetLeft, offsetWidth } = anchorRef.current;
        let top, left;
        if (position === 'bottom' || position === 'top')
            left = offsetLeft + (offsetWidth - (!ready ? ref.current.offsetWidth : tooltipWidth)) / 2;
        else
            top = offsetTop + (offsetHeight - (!ready ? ref.current.offsetHeight : tooltipHeight)) / 2;
        if (position === 'bottom')
            top = offsetTop + offsetHeight + 10;
        else if (position === 'top')
            top = offsetTop - (!ready ? ref.current.offsetHeight : tooltipHeight) - 10;
        else if (position === 'left')
            left = offsetLeft - (!ready ? ref.current.offsetWidth : tooltipWidth) - 10;
        else
            left = offsetLeft + offsetWidth + 10;
        setTop(top);
        setLeft(left);
        setReady(true);
    }, [props.children]);

    const tooltip = (
        <div className={classnames(classes.tooltip, className)} ref={ref} {...others} >
            {text}
        </div>
    );

    return (
        <React.Fragment>
            {React.cloneElement(props.children, { ref: anchorRef })}
            {ready ? (animated ?
                <CSSTransition
                    in={visible}
                    timeout={100}
                    unmountOnExit
                    classNames={{ enter: classes.enter, enterActive: classes.enterActive, exit: classes.exit, exitActive: classes.exitActive }}>
                    {tooltip}
                </CSSTransition> : visible && tooltip) : tooltip}
        </React.Fragment>
    );
});

Tooltip.propTypes = {
    children: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    position: PropTypes.oneOf(propValues.position),
    animated: PropTypes.bool,
};

Tooltip.defaultProps = {
    className: '',
    position: 'bottom',
    animated: true
};

export { Tooltip };