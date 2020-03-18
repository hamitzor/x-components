import PropTypes from 'prop-types';

const MenuItem = props => props.children;

MenuItem.propTypes = {
    children: PropTypes.any.isRequired,
};

export { MenuItem };