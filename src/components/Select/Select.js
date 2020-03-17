import React, { useState, useEffect } from 'react';
import List from '../List';
import ListItem from '../ListItem';
import Button from '../Button';
import Icon from '../Icon';
import { childrenValidator } from '../../util';
import { FaCaretDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { createUseStyles } from 'react-jss';
import classnames from 'classnames';

const duration = 120;

const propValues = {
    color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
};

const useStyles = createUseStyles(theme => ({
    select: {
        display: 'inline-block',
        position: 'relative',
        width: '100%'
    },
    button: {
        textTransform: 'none',
        fontWeight: 400,
        color: theme.textColors.normal,
        '&:hover': {
            backgroundColor: 'initial'
        }
    },
    disabled: {
        color: `${theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark}`
    },
    buttonContent: {
        padding: 0,
        minWidth: theme.unit * 40,
    },
    transparent: {
        color: 'transparent'
    },
    menu: {
        position: 'absolute',
        top: -20,
        left: -10,
        minWidth: theme.unit * 40 + 20,
        zIndex: theme.z.Select,
        boxShadow: theme.shadows[1],
        transformOrigin: 'left top',
        overflowY: 'auto',
        maxHeight: ({ menuItemHeights, maxOption }) => menuItemHeights[maxOption] ? menuItemHeights[maxOption] + theme.unit * 4 : 'none',
        '&::-webkit-scrollbar': {
            width: theme.unit * 1.6
        },
        '&::-webkit-scrollbar-track': {
            background: theme.colors[theme.darkOrLight('darkgrey', 'lightgrey')].normal
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.colors[theme.darkOrLight('darkgrey', 'grey')][theme.darkOrLight('darker', 'light')]
        },
    },
    menuCover: {
        position: 'fixed',
        zIndex: theme.z.Select - 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        cursor: 'initial'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.unit * 5,
        paddingRight: theme.unit * 5,
        whiteSpace: 'nowrap',
    },
    selectEl: {
        cursor: 'pointer',
        display: 'none',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        opacity: 0
    },
    renderSelectEl: {
        display: 'inline-block',
    },
    showSelectEl: {
        opacity: 1
    },
    enter: {
        opacity: 0,
        ...theme.transform(
            `translateY(${theme.unit * -4}px) scaleY(0.5) scaleX(0.8)`
        ),
        transition: theme.transition(['all'], duration)
    },
    enterActive: {
        opacity: 1,
        ...theme.transform('translateY(0px) scaleY(1)  scaleX(1)'),
    },
    exit: {
        opacity: 1,
        ...theme.transform('translateY(0px) scaleY(1)  scaleX(1)'),
        transition: theme.transition(['all'], duration)
    },
    exitActive: {
        opacity: 0,
        ...theme.transform(`translateY(${theme.unit * -4}px) scaleY(0.5)  scaleX(0.8)`),
    }
}));

const Select = React.forwardRef((props, ref) => {
    const {
        children,
        className,
        color,
        disabled,
        value,
        selectProps,
        maxOption,
        onChange,
        animate,
        native,
        ...others
    } = props;
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [ready, setReady] = useState(false);
    const [menuItemHeights, setMenuItemHeights] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [optionClick, setOptionClick] = useState(null);
    const selectElementRef = React.createRef();
    const menuRef = React.createRef();
    const menuCoverRef = React.createRef();
    const classes = useStyles({ menuItemHeights, maxOption });

    useEffect(() => {
        if (!busy && optionClick) {
            selectElementRef.current.value = optionClick.key;
            selectElementRef.current.dispatchEvent(new Event('change', { bubbles: true }));
            setOpen(false);
            setSelectedIndex(optionClick.i);
        }
    }, [optionClick]);

    useEffect(() => {
        if (native) { setReady(true); return; }
        let menuHeight = 0;
        const calculatedMenuItemHeights = [0];
        menuRef.current.querySelectorAll('ul li').forEach(li => {
            menuHeight = menuHeight + li.offsetHeight;
            calculatedMenuItemHeights.push(menuHeight);
        });
        setReady(true);
        setMenuItemHeights(calculatedMenuItemHeights);
    }, []);

    useEffect(() => {
        if (open)
            menuRef.current.scrollTop = menuItemHeights[selectedIndex];
    }, [open]);

    const options = [<option key='' value=''>None</option>,
    ...React.Children.map(children, (child, i) => <option key={i} value={`${child.props.value}`}>{child.props.children}</option>)];

    const menu = (
        <div ref={menuRef} className={classes.menu} >
            <List shadow={false} activeItemId={value} rounded={false} onSelect={(key, i) => setOptionClick({ key, i })}>
                {React.Children.map(options, (child, i) =>
                    <ListItem className={classes.item} key={i} itemId={`${child.props.value}`}>
                        {child.props.children}
                    </ListItem>
                )}
            </List>
        </div>
    );

    return (
        <div ref={ref} className={classnames(classes.select, className)} {...others}>
            {open && <div ref={menuCoverRef} className={classnames(classes.menuCover, 'SelectMenuCover')} onClick={() => setOpen(false)}></div>}
            <Button
                fullWidth
                justify='space-between'
                onClick={() => !native && setOpen(true)}
                disabled={disabled}
                type='transparent'
                className={classnames(classes.button, { [classes.disabled]: disabled })}
                contentClassName={classes.buttonContent}>
                {value === '' ? <span className={classes.transparent}>X</span> :
                    options.filter(option => value === option.props.value)[0].props.children}
                <Icon key='icon'>
                    <FaCaretDown />
                </Icon>
            </Button>
            {ready ? (animate ?
                <CSSTransition
                    in={open}
                    unmountOnExit
                    timeout={duration}
                    classNames={{ enter: classes.enter, enterActive: classes.enterActive, exit: classes.exit, exitActive: classes.exitActive }}
                    onEnter={() => setBusy(true)}
                    onEntered={() => setBusy(false)}
                    onExit={() => setBusy(true)}
                    onExited={() => setBusy(false)} >
                    {menu}
                </CSSTransition> : open && menu) : menu}
            <select
                ref={selectElementRef}
                disabled={disabled}
                value={value}
                onChange={onChange}
                className={classnames(classes.selectEl, { [classes.renderSelectEl]: native, [classes.showSelectEl]: open })}
                {...selectProps}>
                {options}
            </select>
        </div>
    );
});

Select.propTypes = {
    children: childrenValidator([
        { type: 'option', required: true }
    ]),
    className: PropTypes.string,
    color: PropTypes.oneOf(propValues.color),
    disabled: PropTypes.bool,
    value: PropTypes.string,
    selectProps: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    maxOption: PropTypes.number,
    animate: PropTypes.bool,
    native: PropTypes.bool
};

Select.defaultProps = {
    className: '',
    color: 'darkgrey',
    disabled: false,
    selectProps: {},
    maxOption: 5,
    animate: true,
    native: false
};

export { Select };