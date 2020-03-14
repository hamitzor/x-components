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
        transition: theme.transition(['background-color']),
        '&::selection': {
            backgroundColor: 'transparent'
        }
    },
    selected: {
        backgroundColor: Color(theme.backgroundColors.panel)[theme.decide('lighten', 'darken')](theme.decide(0.4, 0.15)).toString(),
    },
    hoverable: {
        '&:hover': {
            backgroundColor: Color(theme.backgroundColors.panel)[theme.decide('lighten', 'darken')](theme.decide(0.14, 0.1)).toString()
        }
    },
    disabled: {
        pointerEvents: 'none',
        color: Color(theme.textColors.normal)[theme.decide('darken', 'lighten')](theme.decide(0.5, 1.6)).toString(),
        backgroundColor: Color(theme.backgroundColors.panel)[theme.decide('lighten', 'darken')](theme.decide(0.08, 0.07)).toString()
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

    delete others.itemId;

    const classes = useStyles(props),
        combinedClasses = {
            listItem: classnames(classes.listItem, {
                [classes.hoverable]: hoverable,
                [classes.selected]: selected,
                [classes.disabled]: disabled,
            }, className)
        };
    return <li ref={ref} className={combinedClasses.listItem} onClick={onSelect} {...others}>{children}</li>;
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