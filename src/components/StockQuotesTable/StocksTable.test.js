import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../test/testUtils';
import StocksTable from './StocksTable';

const setup = () => {
  return shallow(<StocksTable />);
}

describe('StocksTable component', () => {
  describe('render testing', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    })
    test('should render without error', () => {
      const stocksTable = findByTestAttr(wrapper, 'component-stocks-table');
      expect(stocksTable.exists()).toBe(true);
    });
  });
});
