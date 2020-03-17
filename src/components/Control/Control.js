import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';
import { MdBrightness1 } from 'react-icons/md';
import { GoCheck } from 'react-icons/go';

const propValues = {
    kind: ['radio', 'checkbox'],
    color: ['lightgrey', 'grey', 'darkgrey', 'primary', 'success', 'warning', 'error'],
};

const colorClasses = theme => propValues.color.reduce((acc, color) => ({
    ...acc,
    ...['enabled', 'disabled'].reduce((acc, status) => {
        const styles = {};

        if (status !== 'disabled') {
            styles.color = theme.colors[color][theme.darkOrLight('light', 'normal')];
            styles.borderColor = theme.colors[color][theme.darkOrLight('light', 'normal')];
        }
        else {
            styles.color = theme.colors[color].disabled;
            styles.borderColor = theme.colors[color].disabled;
        }

        return {
            ...acc,
            [`${color}${status}`]: styles
        };
    }, {})
}), {});

const kindClasses = () => propValues.kind.reduce((acc, kind) => ({
    ...acc,
    [kind]: {
        borderRadius: kind === 'radio' ? '50%' : 2
    }
}), {});

const useStyles = createUseStyles(theme => ({
    container: {
        display: 'inline-block',
        width: theme.unit * 4,
        height: theme.unit * 4
    },
    disabled: {
        pointerEvents: 'none'
    },
    control: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        cursor: 'pointer'
    },
    icon: {
        transition: theme.transition(['transform'], 140),
    },
    checkIcon: {
        fontSize: 18,
    },
    radioIcon: {
        fontSize: 12,
    },
    ...colorClasses(theme),
    notCheckedIcon: {
        transform: 'scale(0,0)',
    },
    notChecked: {
        borderColor: `${theme.colors[theme.darkOrLight('grey', 'lightgrey')].dark}`
    },
    ...kindClasses()
}));

const Control = React.forwardRef((props, ref) => {
    const { className, kind, color, disabled, checked, ...others } = props;
    const classes = useStyles();
    return (
        <div ref={ref} className={classnames(classes.container, { [classes.disabled]: disabled }, className)} {...others}>
            <div
                className={classnames(
                    classes.control,
                    classes[`${color}${disabled ? 'disabled' : 'enabled'}`],
                    classes[kind],
                    {
                        [classes.notChecked]: !checked
                    }
                )}>
                {kind === 'radio' ?
                    <MdBrightness1 className={classnames(classes.icon, classes.radioIcon, { [classes.notCheckedIcon]: !checked })} />
                    :
                    <GoCheck className={classnames(classes.icon, classes.checkIcon, { [classes.notCheckedIcon]: !checked })} />}
            </div>
        </div>
    );
});

Control.propTypes = {
    checked: PropTypes.bool.isRequired,
    className: PropTypes.string,
    kind: PropTypes.oneOf(propValues.kind),
    color: PropTypes.oneOf(propValues.color),
    disabled: PropTypes.bool,
};

Control.defaultProps = {
    className: '',
    kind: 'checkbox',
    color: 'primary',
    disabled: false,
};

export { Control, propValues };