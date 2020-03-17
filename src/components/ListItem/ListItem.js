import React from 'react';
import { createUseStyles } from 'react-jss';
import Color from 'color';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const useStyles = createUseStyles(theme => ({
    listItem: {
        color: theme.textColors.normal,
        backgroundColor: theme.backgroundColors.panel,
        minHeight: theme.unit * 8,
        display: 'block',
        cursor: 'pointer',
        transition: theme.transition(['background-color'], 100),
        '&::selection': {
            backgroundColor: 'transparent'
        }
    },
    selected: {
        backgroundColor: Color(theme.backgroundColors.panel)[theme.darkOrLight('lighten', 'darken')](theme.darkOrLight(0.4, 0.15)).toString(),
    },
    hoverable: {
        '&:hover': {
            backgroundColor: Color(theme.backgroundColors.panel)[theme.darkOrLight('lighten', 'darken')](theme.darkOrLight(0.14, 0.1)).toString()
        }
    },
    disabled: {
        pointerEvents: 'none',
        color: Color(theme.textColors.normal)[theme.darkOrLight('darken', 'lighten')](theme.darkOrLight(0.5, 1.6)).toString(),
        backgroundColor: Color(theme.backgroundColors.panel)[theme.darkOrLight('lighten', 'darken')](theme.darkOrLight(0.08, 0.07)).toString()
    }
}));

const ListItem = React.forwardRef((props, ref) => {
    const {
        className,
        children,
        onSelect,
        hoverable,
        selected,
        disabled,
        ...others
    } = props;
    const classes = useStyles();

    delete others.itemId;

    return (
        <li
            ref={ref}
            className={classnames(classes.listItem, {
                [classes.hoverable]: hoverable,
                [classes.selected]: selected,
                [classes.disabled]: disabled,
            }, className)}
            onClick={onSelect}
            {...others}>
            {children}
        </li>
    );
});

ListItem.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    itemId: PropTypes.any.isRequired,
    hoverable: PropTypes.bool,
    onSelect: PropTypes.func,
    selected: PropTypes.bool,
    disabled: PropTypes.bool
};

ListItem.defaultProps = {
    className: '',
    onSelect: undefined,
    selected: false,
    disabled: false
};

export { ListItem };