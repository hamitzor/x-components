import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Button from './Button';

describe('<Button />', () => {

  it('has class "test-class"', () => {
    const wrapper = shallow(<Button className='test-class' />);
    expect(wrapper.hasClass('test-class')).to.have.be.true;
  });

});