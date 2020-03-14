import React from 'react';
import PropTypes from 'prop-types';

const InputExtension = React.forwardRef((props, ref) => React.cloneElement(props.children, { ref }));

InputExtension.propTypes = {
    children: PropTypes.element.isRequired
};

export { InputExtension };