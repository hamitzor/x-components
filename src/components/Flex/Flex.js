import React from 'react';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const propValues = {
    direction: ['row', 'row-r', 'column', 'column-r', 'initial', 'inherit'],
    wrap: ['nowrap', 'wrap', 'wrap-r', 'initial', 'inherit'],
    justify: ['start', 'end', 'center', 'between', 'around', 'initial', 'inherit'],
    alignItems: ['stretch', 'center', 'start', 'end', 'baseline', 'initial', 'inherit'],
    alignContent: ['stretch', 'center', 'start', 'end', 'between', 'around', 'initial', 'inherit'],
};

const itemProps = {
    size: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
};

const propNameToCssPropertyMap = Object.keys(propValues).reduce((acc, propName) => ({
    ...acc, [propName]: propName
        .replace('direction', 'flexDirection')
        .replace('wrap', 'flexWrap')
        .replace('justify', 'justifyContent')
}), {});

const propValueToCssValueMap = Object.keys(propValues).reduce((acc, propName) => ({
    ...acc,
    ...propValues[propName].reduce((acc, value) => ({
        ...acc,
        [value]: value
            .replace('-r', '-reverse')
            .replace(/(start|end)/, `flex-${value}`)
            .replace(/(between|around)/, `space-${value}`)
    }), {})
}), {});

const parentEssentialClasses = () => Object.keys(propValues).reduce((acc, propName) => ({
    ...acc,
    ...propValues[propName].reduce((acc, val) => ({
        ...acc,
        [`${val}${propName}`]: { [propNameToCssPropertyMap[propName]]: propValueToCssValueMap[val] }
    }), {})
}), {});

const itemClasses = theme => theme.breakpoints.reduce((acc, breakpoint) => ({
    ...acc,
    ...itemProps.size.reduce((acc, size) => ({
        ...acc,
        [`${size}${breakpoint}`]: {
            [theme.min(breakpoint)]: {
                width: `${(size / 12 * 100).toFixed(6)}%`,
            }
        }
    }), {})
}), {});

const useStyles = createUseStyles(theme => ({
    ...parentEssentialClasses(),
    ...itemClasses(theme),
    container: {
        display: 'flex',
    },
    fullWidth: {
        width: '100%'
    },
    fullHeight: {
        height: '100%'
    },
}));

const Flex = React.forwardRef((props, ref) => {
    const {
        className,
        children,
        container,
        item,
        direction,
        wrap,
        justify,
        alignItems,
        alignContent,
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
        fullHeight,
        fullWidth,
        ...others
    } = props;

    const classes = useStyles(), combinedClasses = {
        root: classnames(
            classes[`${direction}direction`],
            classes[`${wrap}wrap`],
            classes[`${justify}justify`],
            classes[`${alignItems}alignItems`],
            classes[`${alignContent}alignContent`], {
            [classes.container]: container,
            [classes[`${xs}xs`]]: xs && item,
            [classes[`${sm}sm`]]: sm && item,
            [classes[`${md}md`]]: md && item,
            [classes[`${lg}lg`]]: lg && item,
            [classes[`${xl}xl`]]: xl && item,
            [classes[`${xxl}xxl`]]: xxl && item,
            [classes.fullWidth]: fullWidth || (container && !item),
            [classes.fullHeight]: fullHeight
        }, className)
    };
    return (
        <div ref={ref} className={combinedClasses.root} {...others}>
            {children}
        </div>
    );
});

Flex.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    container: PropTypes.bool,
    item: PropTypes.bool,
    direction: PropTypes.oneOf(propValues.direction),
    wrap: PropTypes.oneOf(propValues.wrap),
    justify: PropTypes.oneOf(propValues.justify),
    alignItems: PropTypes.oneOf(propValues.alignItems),
    alignContent: PropTypes.oneOf(propValues.alignContent),
    xs: PropTypes.oneOf(itemProps.size),
    sm: PropTypes.oneOf(itemProps.size),
    md: PropTypes.oneOf(itemProps.size),
    lg: PropTypes.oneOf(itemProps.size),
    xl: PropTypes.oneOf(itemProps.size),
    xxl: PropTypes.oneOf(itemProps.size),
    fullHeight: PropTypes.bool,
    fullWidth: PropTypes.bool
};

Flex.defaultProps = {
    className: '',
    children: null,
    container: false,
    item: false,
    direction: 'row',
    wrap: 'nowrap',
    justify: 'start',
    alignItems: 'stretch',
    alignContent: 'stretch',
    fullHeight: false
};

export { Flex, propValues, itemProps };