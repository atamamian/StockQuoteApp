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
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  });
});