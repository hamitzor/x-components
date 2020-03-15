import React, { useState, useEffect } from 'react';
import List from '../List';
import ListItem from '../ListItem';
import Button from '../Button';
import Icon from '../Icon';
import { childrenValidator } from '../../util';
import { FaCaretDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { createUseStyles, useTheme } from 'react-jss';
import classnames from 'classnames';
import { isMobile } from '../../util';

const duration = 120;

const propValues = {
    color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
};

const useStyles = createUseStyles(theme => ({
    root: {
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
    buttonContent: {
        padding: 0,
        minWidth: theme.unit * 40,
    },
    menu: {
        position: 'absolute',
        top: -20,
        left: -10,
        minWidth: theme.unit * 40 + 20,
        zIndex: theme.z.Select,
        boxShadow: theme.shadows[1],
        backgroundColor: '#fff',
        borderRadius: theme.unit,
        transformOrigin: 'left top',
        paddingTop: theme.unit * 1.5,
        paddingBottom: theme.unit * 1.5,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: theme.unit
        },
        '&::-webkit-scrollbar-track': {
            background: theme.colors.lightgrey.normal,
        },
        '&::-webkit-scrollbar-thumb': {
            background: theme.colors.lightgrey.darker,
        },
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.unit * 5,
        paddingRight: theme.unit * 5,
        whiteSpace: 'nowrap',
    },
    select: {
        cursor: 'pointer',
        display: 'none',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        opacity: 0
    },
    visibleSelect: {
        opacity: 1
    },
    renderedSelect: {
        display: 'inline-block'
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
        ...theme.transform(
            'translateY(0px) scaleY(1)  scaleX(1)'
        ),
    },
    exit: {
        opacity: 1,
        ...theme.transform(
            'translateY(0px) scaleY(1)  scaleX(1)'
        ),
        transition: theme.transition(['all'], duration)
    },
    exitActive: {
        opacity: 0,
        ...theme.transform(
            `translateY(${theme.unit * -4}px) scaleY(0.5)  scaleX(0.8)`
        ),
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
        ...others
    } = props;
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [ready, setReady] = useState(false);
    const [menuItemHeights, setMenuItemHeights] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [outsideClick, setOutsideClick] = useState(null);
    const [optionClick, setOptionClick] = useState(null);
    const selectElementRef = React.createRef();
    const menuRef = React.createRef();
    const rootRef = React.createRef();
    const theme = useTheme();
    const classes = useStyles();

    const handleClick = () => {
        if (!isMobile)
            setOpen(true);
    };

    const handleClickOutside = e => {
        setOutsideClick(e);
    };

    const getLabelFromOptions = value => {
        let label = ' ';
        React.Children.forEach(options, child => {
            if (value === child.props.value) {
                label = child.props.children;
                return;
            }
        });
        return label;
    };

    useEffect(() => {
        if (!busy)
            if (optionClick) {
                const event = new Event('change', { bubbles: true });
                selectElementRef.current.value = optionClick.key;
                selectElementRef.current.dispatchEvent(event);
                setOpen(false);
                setSelectedIndex(optionClick.i);
            }
    }, [optionClick]);

    useEffect(() => {
        if (open && !busy)
            if (rootRef.current && !rootRef.current.contains(outsideClick.target))
                setOpen(false);
    }, [outsideClick]);

    useEffect(() => {
        if (!isMobile) {
            let menuHeight = 0;
            const calculatedMenuItemHeights = [0];
            menuRef.current.querySelectorAll('ul li').forEach((li) => {
                menuHeight = menuHeight + li.offsetHeight;
                calculatedMenuItemHeights.push(menuHeight);
            });
            setReady(true);
            setMenuItemHeights(calculatedMenuItemHeights);
            document.addEventListener('click', handleClickOutside);
        }
        else
            setReady(true);

        return () => {
            if (!isMobile)
                document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        menuRef.current.scrollTop = menuItemHeights[selectedIndex];
    }, [open]);

    const options = [<option key='' value=''>None</option>, ...React.Children.map(children, (child, i) =>
        <option key={i} value={`${child.props.value}`}>{child.props.children}</option>
    )];

    const menu = (
        <div
            ref={menuRef} className={classes.menu}
            style={{ maxHeight: menuItemHeights[maxOption] ? menuItemHeights[maxOption] + theme.unit * 4 : 'none' }}>
            <List shadow={false} activeItemId={value} radius={0} onSelect={(key, i) => setOptionClick({ key, i })}>
                {React.Children.map(options, (child, i) => 
                    <ListItem className={classes.item} key={i} itemId={`${child.props.value}`}>
                        {child.props.children}
                    </ListItem>
                )}
            </List>
        </div>
    );

    return (
        <div
            ref={el => {
                rootRef.current = el;
                if (ref)
                    ref.current = el;
            }}
            className={classnames(classes.root, className)}
            {...others}>
            <Button
                fullWidth
                justify='space-between'
                onClick={handleClick}
                disabled={disabled}
                type='transparent'
                className={classes.button}
                contentClassName={classes.buttonContent}>
                {value === '' ? <span style={{ color: 'transparent' }}>X</span> : getLabelFromOptions(value)}
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
                className={classnames(classes.select, {
                    [classes.renderedSelect]: isMobile,
                    [classes.visibleSelect]: isMobile && open
                })}
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
};

Select.defaultProps = {
    className: '',
    color: 'darkgrey',
    disabled: false,
    selectProps: {},
    maxOption: 5,
    animate: true,
};

export { Select };