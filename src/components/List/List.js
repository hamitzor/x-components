import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { childrenValidator } from '../../util';
import ListItem from '../ListItem';
import Panel from '../Panel';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
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
}));

const List = React.forwardRef((props, ref) => {
    const {
        className,
        children,
        hoverable,
        rounded,
        padding,
        shadow,
        ...others
    } = props;

    delete others.activeItemId;

    const classes = useStyles(),
        combinedClasses = {
            list: classnames(classes.list, className)
        };
    return (
        <Panel ref={ref} className={combinedClasses.list} rounded={rounded} padding={padding} shadow={shadow}  {...others}>
            <ul className={classes.ul}>
                {React.Children.map(children, (child, i) => child &&
                    <child.type {...child.props} hoverable={hoverable} onSelect={e => props.onSelect && props.onSelect(child.props.itemId, i, e)}
                        selected={child.props.itemId === props.activeItemId} key={i} />
                )}
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