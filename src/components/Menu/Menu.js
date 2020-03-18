import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';
import { CSSTransition } from 'react-transition-group';
import { childrenValidator } from '../../util';
import List from '../List';
import ListItem from '../ListItem';
import MenuItem from '../MenuItem';
import HideBodyScrollbar from '../HideBodyScrollbar';

const duration = 130;

const useStyles = createUseStyles(theme => ({
    menu: {
        fontWeight: 500,
        position: 'absolute',
        zIndex: theme.z.Menu,
    },
    menuCover: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.z.Menu - 1
    },
    list: {
        transformOrigin: 'center top',
        position: 'absolute',
        left: ({ left }) => left - 4,
        top: ({ top }) => top - 8
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    enter: {
        '& $list': {
            opacity: 0,
            transform: 'scale(0.6,0.8)',
            transition: theme.transition(['transform', 'opacity'], duration)
        }
    },
    enterActive: {
        '& $list': {
            opacity: 1,
            transform: 'scale(1,1)',
        }
    },
    exit: {
        '& $list': {
            opacity: 1,
            transform: 'scale(1,1)',
            transition: theme.transition(['transform', 'opacity'], duration)
        }
    },
    exitActive: {
        '& $list': {
            opacity: 0,
            transform: 'scale(0.6,0.8)'
        }
    }
}));

const Menu = React.forwardRef((props, ref) => {
    const { children, className, onSelect, open, animate, anchorEl, clickPosition, ...others } = props;
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const classes = useStyles({ left, top });
    const menuCoverRef = React.createRef();

    useEffect(() => {
        if (clickPosition) {
            setLeft(clickPosition.left);
            setTop(clickPosition.top);
        }
        if (anchorEl) {
            const rect = anchorEl.getBoundingClientRect();
            setLeft(rect.left);
            setTop(rect.top);
        }
    }, [anchorEl, clickPosition]);

    const context = (
        <div
            ref={menuCoverRef}
            className={classes.menuCover}
            onContextMenu={e => {
                if (!anchorEl) {
                    e.preventDefault();
                    setLeft(e.clientX);
                    setTop(e.clientY);
                }
            }}
            onClick={e => e.target === menuCoverRef.current && onSelect(null)}>
            <HideBodyScrollbar />
            <List className={classes.list} onSelect={onSelect}>
                {React.Children.map(children, (child, i) => child && (
                    <ListItem className={classnames(classes.item, className)} key={i} itemId={child.props.itemId} >{child.props.children}</ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.menu} ref={ref} {...others} >
            {animate ?
                <CSSTransition
                    in={open}
                    timeout={duration}
                    classNames={{ enter: classes.enter, enterActive: classes.enterActive, exit: classes.exit, exitActive: classes.exitActive }}
                    unmountOnExit>
                    {context}
                </CSSTransition>
                : open && context}
        </div>
    );
});

Menu.propTypes = {
    children: childrenValidator([{ type: MenuItem, required: true }]),
    className: PropTypes.string,
    onSelect: PropTypes.func,
    open: PropTypes.bool,
    animate: PropTypes.bool,
    anchorEl: PropTypes.object,
    clickPosition: PropTypes.object
};

Menu.defaultProps = {
    className: '',
    onSelect: () => { },
    open: false,
    animate: true,
    anchorEl: null,
    clickPosition: null
};

export { Menu };