import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';

const propValues = {
    color: ['lightgrey', 'grey', 'darkgrey', 'primary', 'success', 'warning', 'error'],
};

const colorClasses = theme => propValues.color.reduce((acc, color) => ({
    ...acc,
    [color]: {
        color: theme.textColors.reversed,
        backgroundColor: theme.colors[color][theme.darkOrLight('light', 'normal')]
    }
}), {});

const useStyles = createUseStyles(theme => ({
    badge: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: theme.unit * -2,
        right: theme.unit * -2,
        width: 20,
        height: 20,
        fontSize: 9,
        borderRadius: '50%',
        transition: theme.transition(['background']),
        cursor: 'initial',
        textTransform: 'none',
        fontWeight: 700
    },
    ...colorClasses(theme)
}));

const Badge = React.forwardRef((props, ref) => {
    const {
        color,
        className,
        value,
        maxValue,
        ...others
    } = props;
    const classes = useStyles();

    return (
        <div ref={ref} className={classnames(classes.badge, classes[color], className)} {...others}>
            {(maxValue && !isNaN(value) && parseInt(value) > maxValue) ? `${maxValue}+` : value}
        </div>
    );
});

Badge.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string.isRequired,
    maxValue: PropTypes.number,
    color: PropTypes.oneOf(propValues.color)
};

Badge.defaultProps = {
    className: '',
    maxValue: null,
    color: 'warning'
};

export { Badge, propValues };