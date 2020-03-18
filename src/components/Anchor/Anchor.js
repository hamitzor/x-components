import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';

const propValues = {
    color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
};

const colorClasses = theme => propValues.color.reduce((acc, color) => ({
    ...acc,
    ...['enabled', 'disabled'].reduce((acc, disabled) => {
        const styles = {};
        if (disabled !== 'disabled') {
            styles.color = theme.colors[color].normal;
            styles['&:active'] = {
                color: theme.colors[color].light
            };
        }
        else
            styles.color = theme.colors[color].disabled;
        return {
            ...acc,
            [`${color}${disabled}`]: {
                ...styles,
                '& a': {
                    ...styles
                }
            },
        };
    }, {})
}), {});

const useStyles = createUseStyles(theme => ({
    link: {
        display: 'inline-block',
        '& a': {
            textDecoration: 'none'
        }
    },
    disabled: {
        '& a': {
            pointerEvents: 'none'
        }
    },
    ...colorClasses(theme)
}));

const Anchor = props => {
    const {
        children,
        color,
        disabled,
        className,
        ...others
    } = props;
    const classes = useStyles();

    return <div
        className={classnames(
            classes.link,
            classes[`${color}${disabled ? 'disabled' : 'enabled'}`],
            {
                [classes.disabled]: disabled,
            },
            className
        )}
        {...others}>
        {children}
    </div>;
};

Anchor.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    color: PropTypes.oneOf(propValues.color),
    disabled: PropTypes.bool
};

Anchor.defaultProps = {
    className: '',
    color: 'primary',
    disabled: false
};

export { Anchor, propValues };