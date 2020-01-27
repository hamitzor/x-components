import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
   render() {
      const {
         className,
      } = this.props;

      return (
         <button className={className} >
            Button
         </button>
      );
   }
}

Button.propTypes = {
   className: PropTypes.string,
};

Button.defaultProps = {
   className: '',
};

export default Button;