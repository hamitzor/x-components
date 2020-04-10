import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';
import { GoCheck } from 'react-icons/go';

const propValues = {
    color: ['lightgrey', 'grey', 'darkgrey', 'primary', 'success', 'warning', 'error'],
};

const colorClasses = theme => propValues.color.reduce((acc, color) => ({
    ...acc,
    [color]: {
        color: theme.colors[color][theme.darkOrLight('light', 'normal')],
        borderColor: theme.colors[color][theme.darkOrLight('light', 'normal')]
    }
}), {});

const useStyles = createUseStyles(theme => ({
    container: {
        display: 'inline-block',
        padding: theme.unit * 2,
        position: 'relative',
        cursor: 'pointer',
    },
    input: {
        display: 'inline-block',
        position: 'absolute',
        top: 0,
        left: 0,
        cursor: 'inherit',
        height: '100%',
        width: '100%',
        margin: 0,
        opacity: 0,
        padding: 0,
        zIndex: 1,
    },
    checkbox: {
        display: 'flex',
        width: theme.unit * 4,
        height: theme.unit * 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 2
    },
    icon: {
        transition: theme.transition(['transform'], 140),
        fontSize: 18,
    },
    notCheckedIcon: {
        transform: 'scale(0,0)',
    },
    ...colorClasses(theme),
    notChecked: {
        borderColor: theme.colors.lightgrey[theme.darkOrLight('normal', 'darker')]
    },
    disabled: {
        pointerEvents: 'none',
        borderColor: theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark,
        color: theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark,
    },
}));

const Checkbox = React.forwardRef((props, ref) => {
    const { className, color, disabled, checked, onChange, name, ...others } = props;
    const classes = useStyles();
    return (
        <div ref={ref} className={classnames(classes.container, classes[color], { [classes.disabled]: disabled }, className)} {...others}>
            <input name={name} className={classes.input} type="checkbox" checked={checked} onChange={onChange} />
            <div className={classnames(classes.checkbox, { [classes.notChecked]: !disabled && !checked })}>
                <GoCheck className={classnames(classes.icon, { [classes.notCheckedIcon]: !checked })} />
            </div>
        </div>
    );
});

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    color: PropTypes.oneOf(propValues.color),
    disabled: PropTypes.bool,
    name: PropTypes.string
};

Checkbox.defaultProps = {
    className: '',
    color: 'primary',
    disabled: false,
    name: ''
};

export { Checkbox, propValues };