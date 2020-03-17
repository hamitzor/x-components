import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import { createUseStyles, useTheme } from 'react-jss';
import { CSSTransition } from 'react-transition-group';
import { FaInfoCircle, FaExclamationCircle, FaCheckCircle, FaExclamation } from 'react-icons/fa';

const propValues = {
    type: ['info', 'success', 'warning', 'error']
};

const alignClasses = theme => ['top', 'bottom', 'unset'].reduce((acc, align) => ({
    ...acc,
    [`${align}Align`]: { [align !== 'unset' ? align : '']: theme.unit * 2 },
    [`${align}AlignFullWidth`]: { [align !== 'unset' ? align : '']: 0 },
}), {});

const typeClasses = theme => propValues.type.reduce((acc, type) => {
    const color = theme.colors[type === 'info' ? 'primary' : type][theme.darkOrLight('light', 'normal')];
    return {
        ...acc,
        [`${type}Type`]: {
            color: color,
            backgroundColor: theme.backgroundColors.panel
        },
        [`${type}FilledType`]: {
            color: theme.textColors.reversed,
            backgroundColor: color
        }
    };
}, {});

const useStyles = createUseStyles(theme => ({
    alert: {
        backgroundColor: theme.colors.white,
        cursor: 'pointer',
        padding: `${theme.unit * 2}px ${theme.unit * 3}px`,
        borderRadius: theme.unit,
        boxShadow: theme.shadows[1],
        zIndex: theme.z.Alert,
        right: theme.unit * 3
    },
    content: {
        display: 'flex',
        alignItems: 'center'
    },
    text: {
        marginLeft: 7
    },
    icon: {
        fontSize: 20
    },
    fixed: {
        position: 'fixed'
    },
    absolute: {
        position: 'absolute'
    },
    enter: {
        opacity: 0,
        transition: theme.transition()
    },
    enterActive: {
        opacity: 1,
    },
    exit: {
        opacity: 1,
        transition: theme.transition()
    },
    exitActive: {
        opacity: 0,
    },
    ...alignClasses(theme),
    ...typeClasses(theme),
    fullWidth: {
        borderRadius: 0,
        left: 0,
        right: 0,
        padding: `${theme.unit * 2}px ${theme.unit * 3}px`,
        boxShadow: theme.shadows[1],
        maxWidth: 'none'
    }
}));

const Alert = React.forwardRef((props, ref) => {
    const { children, className, open, fullWidth, animate, type, filled, fixed, absolute, ...others } = props;
    const classes = useStyles();
    const theme = useTheme();

    const icon = {
        info: () => <FaInfoCircle className={classes.icon} />,
        success: () => <FaCheckCircle className={classes.icon} />,
        warning: () => <FaExclamation className={classes.icon} />,
        error: () => <FaExclamationCircle className={classes.icon} />,
    };

    const alert = (
        <div
            ref={ref}
            className={classnames(
                classes.alert,
                classes[`${type}Type`],
                classes[`${type === 'error' || type === 'info' ? 'top' : 'bottom'}Align`],
                {
                    [classes[`${type}FilledType`]]: filled,
                    [classes.fullWidth]: fullWidth,
                    [classes[`${type === 'error' || type === 'info' ? 'top' : 'bottom'}AlignFullWidth`]]: fullWidth,
                    [classes.fixed]: fixed,
                    [classes.absolute]: absolute,
                },
                className
            )}
            {...others}>
            <div className={classes.content}>
                <Icon>
                    {icon[type]()}
                </Icon>
                <div className={classes.text}>
                    {children}
                </div>
            </div>
        </div>
    );

    return (
        animate ?
            <CSSTransition
                in={open}
                unmountOnExit
                timeout={theme.animationDuration}
                classNames={{ enter: classes.enter, enterActive: classes.enterActive, exit: classes.exit, exitActive: classes.exitActive }}
            >
                {alert}
            </CSSTransition> : open && alert
    );
});

Alert.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    open: PropTypes.bool,
    fullWidth: PropTypes.bool,
    animate: PropTypes.bool,
    type: PropTypes.oneOf(propValues.type),
    filled: PropTypes.bool,
    fixed: PropTypes.bool,
    absolute: PropTypes.bool,
};

Alert.defaultProps = {
    className: '',
    open: false,
    fullWidth: false,
    animate: true,
    type: 'info',
    filled: false,
    fixed: true,
    absolute: false
};

export { Alert, propValues };