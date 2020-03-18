import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Button from '../Button';
import classnames from 'classnames';

const propValues = {
    color: ['grey', 'darkgrey', 'primary', 'secondary', 'success', 'warning', 'error'],
    type: ['default', 'filled', 'transparent']
};

const colorClasses = theme => propValues.color.reduce((acc, color) => ({
    ...acc,
    [color]: { borderTopColor: theme.colors[color].normal }
}), {});

const useStyles = createUseStyles(theme => ({
    tab: {
        transition: theme.transition(),
        borderTop: '3px solid transparent',
        minWidth: theme.unit * 24,
        height: '100%'
    },
    content: {
        justifyContent: 'center'
    },
    ...colorClasses(theme)
}));

const Tab = React.forwardRef((props, ref) => {
    const { className, children, color, type, active, tabId, onActive, ...others } = props;
    const classes = useStyles();

    return (
        <Button
            noShadow
            className={classnames(classes.tab, { [classes[color]]: active, }, className)}
            rounded={false}
            color={color}
            type={type}
            contentClassName={classes.content}
            onClick={e => onActive && onActive(e, props.tabId)}
            {...others}
            ref={ref}>
            {children}
        </Button>
    );
});

Tab.propTypes = {
    children: PropTypes.any.isRequired,
    tabId: PropTypes.number.isRequired,
    className: PropTypes.string,
    color: PropTypes.oneOf(propValues.color),
    type: PropTypes.oneOf(propValues.type),
    active: PropTypes.bool,
    onActive: PropTypes.func,
};

Tab.defaultProps = {
    className: '',
    color: 'primary',
    type: 'filled',
    active: false,
    onActive: () => null
};

export { Tab, propValues };