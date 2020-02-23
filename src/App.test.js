import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import { findByTestAttr } from '../test/testUtils';

const setup = () => {
  return shallow(<App />)
}

describe('App Component', () => {
  test('should render without error', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });
});