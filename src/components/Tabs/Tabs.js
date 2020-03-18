import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { childrenValidator } from '../../util';
import { createUseStyles, useTheme } from 'react-jss';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Tab from '../Tab';
import Button from '../Button';
import Icon from '../Icon';
const isTouchDevice = require('is-touch-device');

const propValues = {
    color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
    type: ['default', 'filled', 'transparent']
};

const useStyles = createUseStyles(theme => ({
    root: {
        height: theme.unit * 9,
        display: 'flex',
        overflow: 'hidden',
    },
    rounded: {
        borderRadius: theme.fontSizes.normal / 4
    },
    invisible: {
        visibility: 'hidden'
    },
    container: {
        width: `calc( 100% - ${theme.unit * 14}px )`,
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    noControls: {
        width: '100%',
        overflowX: 'auto'
    },
    tabs: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 40,
        display: 'flex',
        transition: theme.transition()
    },
    control: {
        width: theme.unit * 7,
    },
    controlHide: {
        visibility: 'hidden'
    },
    controlLeftContent: {
        justifyContent: 'flex-start'
    },
    controlRightContent: {
        justifyContent: 'flex-end'
    }
}));

const Tabs = React.forwardRef((props, ref) => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(undefined);
    const [ready, setReady] = useState(false);
    const [containerWidth, setContainerWidth] = useState(false);
    const containerRef = React.createRef();
    const { children, className, radius, color, type, hideControls, active, rounded, onChange, ...others } = props;
    const classes = useStyles();
    const theme = useTheme();

    const tabNumber = children.length;
    const derivedChildren = React.Children.map(children, child => child &&
        <child.type
            {...child.props}
            type={type}
            color={color}
            active={child.props.tabId === active}
            onActive={(e, id) => onChange(e, id)}
            style={{ width: `${100 / tabNumber}%` }} />
    );
    const childCount = derivedChildren.length;
    const showControls = hideControls ? false :
        typeof isTouchDevice() === 'boolean' && !isTouchDevice() && containerWidth < childCount * theme.unit * 24;

    useEffect(() => {
        const containerWidth = containerRef.current.offsetWidth;
        const tabNumber = children.length;
        setTotalPage(Math.ceil(tabNumber / Math.floor(containerWidth / theme.unit / 24)));
        setReady(true);
        setContainerWidth(containerWidth);
    });

    return (
        <div className={classnames(classes.root, { [classes.invisible]: !ready, [classes.rounded]: rounded, }, className)} {...others} ref={ref}>
            {showControls &&
                <Button
                    onClick={() => setPage(page - 1 < 1 ? 1 : page - 1)}
                    size='small'
                    type='transparent'
                    color={color}
                    className={classnames(classes.control, { [classes.controlHide]: page < 2 })}
                    contentClassName={classes.controlLeftContent}>
                    <Icon>
                        <FaChevronLeft />
                    </Icon>
                </Button>}
            <div ref={containerRef} className={classnames(classes.container, { [classes.noControls]: !showControls, [classes.rounded]: rounded })}>
                <div
                    style={{ left: `calc(calc( -${childCount * theme.unit * 24}px + 100% )/${totalPage - 1}*${page - 1})` }}
                    className={classes.tabs}>
                    {derivedChildren}
                </div>
            </div>
            {showControls &&
                <Button
                    onClick={() => setPage(page + 1 > totalPage ? 1 : page + 1)}
                    size='small'
                    type='transparent'
                    color={color}
                    className={classnames(classes.control, { [classes.controlHide]: page + 1 > totalPage })}
                    contentClassName={classes.controlRightContent}>
                    <Icon>
                        <FaChevronRight />
                    </Icon>
                </Button>}
        </div>
    );
});

Tabs.propTypes = {
    children: childrenValidator([
        { type: Tab, required: true }
    ]),
    active: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
    color: PropTypes.oneOf(propValues.color),
    type: PropTypes.oneOf(propValues.type),
    rounded: PropTypes.bool,
    hideControls: PropTypes.bool,
};

Tabs.defaultProps = {
    onChange: () => null,
    className: '',
    color: 'primary',
    type: 'filled',
    rounded: true,
    hideControls: false
};

export { Tabs, propValues };