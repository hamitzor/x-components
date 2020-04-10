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
        transition: theme.transition(),
        left: ({ tabNumber, totalPage, page }) => `calc(( -${tabNumber * theme.unit * 24}px + 100% )/${totalPage - 1}*${page - 1})`
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
    },
    tab: {
        width: ({ tabNumber }) => `${100 / tabNumber}%`
    }
}));

const Tabs = React.forwardRef((props, ref) => {
    const { children, className, radius, color, type, hideControls, active, rounded, onChange, initialPage, ...others } = props;
    const [page, setPage] = useState(initialPage);
    const [totalPageNum, setTotalPageNum] = useState(undefined);
    const [ready, setReady] = useState(false);
    const [containerWidth, setContainerWidth] = useState(false);
    const containerRef = React.createRef();
    const theme = useTheme();
    const tabNumber = children.length;
    const tabWidth = theme.unit * 24;
    const showControls =
        hideControls ? false : typeof isTouchDevice() === 'boolean' && !isTouchDevice() && containerWidth < tabNumber * tabWidth;
    const classes = useStyles({ tabNumber, totalPage: totalPageNum, page });

    useEffect(() => {
        const containerWidth = containerRef.current.offsetWidth;
        const tabNumber = children.length;
        setTotalPageNum(Math.ceil(tabNumber / Math.floor(containerWidth / (tabWidth))));
        setReady(true);
        setContainerWidth(containerWidth);
    }, [props.children]);

    const derivedChildren = React.Children.map(children, (child, i) => child &&
        <child.type
            {...child.props}
            type={type}
            color={color}
            active={child.props.tabId === active}
            onActive={(e, id) => onChange(e, id)}
            className={classnames(classes.tab, child.props.className)} />
    );

    return (
        <div className={classnames(classes.root, { [classes.invisible]: !ready, [classes.rounded]: rounded, }, className)} {...others} ref={ref}>
            {showControls &&
                <Button
                    onClick={() => setPage(page - 1 < 1 ? 1 : page - 1)}
                    type='transparent'
                    color={color}
                    rounded={rounded}
                    className={classnames(classes.control, { [classes.controlHide]: page < 2 })}
                    contentClassName={classes.controlLeftContent}>
                    <Icon>
                        <FaChevronLeft />
                    </Icon>
                </Button>}
            <div ref={containerRef} className={classnames(classes.container, { [classes.noControls]: !showControls, [classes.rounded]: rounded })}>
                <div
                    className={classes.tabs}>
                    {derivedChildren}
                </div>
            </div>
            {showControls &&
                <Button
                    onClick={() => setPage(page + 1 > totalPageNum ? 1 : page + 1)}
                    type='transparent'
                    color={color}
                    rounded={rounded}
                    className={classnames(classes.control, { [classes.controlHide]: page + 1 > totalPageNum })}
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
    initialPage: PropTypes.number
};

Tabs.defaultProps = {
    onChange: () => null,
    className: '',
    color: 'primary',
    type: 'filled',
    rounded: true,
    hideControls: false,
    initialPage: 1
};

export { Tabs, propValues };