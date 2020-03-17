import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { childrenValidator } from '../../util';
import ListItem from '../ListItem';
import Panel from '../Panel';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    list: {
        display: 'flex'
    },
    ul: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        overflow: 'hidden',
        width: '100%'
    }
});

const List = React.forwardRef((props, ref) => {
    const { children, className, hoverable, rounded, padding, shadow, onSelect, ...others } = props;
    delete others.activeItemId;
    const classes = useStyles();

    return (
        <Panel ref={ref} className={classnames(classes.list, className)} rounded={rounded} padding={padding} shadow={shadow}  {...others}>
            <ul className={classes.ul}>
                {React.Children.map(children, (child, i) => child && React.cloneElement(child, {
                    hoverable: hoverable,
                    onSelect: e => onSelect && onSelect(child.props.itemId, i, e),
                    selected: child.props.itemId === props.activeItemId,
                    key: i
                }))}
            </ul>
        </Panel>
    );
});

List.propTypes = {
    children: childrenValidator([{ type: ListItem }]),
    className: PropTypes.string,
    activeItemId: PropTypes.any,
    hoverable: PropTypes.bool,
    rounded: PropTypes.bool,
    padding: PropTypes.bool,
    shadow: PropTypes.bool,
    onSelect: PropTypes.func,
};

List.defaultProps = {
    className: '',
    activeItemId: null,
    hoverable: true,
    rounded: true,
    padding: false,
    shadow: true,
    onSelect: () => null
};

export { List };