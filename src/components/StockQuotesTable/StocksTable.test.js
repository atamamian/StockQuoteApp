import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../test/testUtils';
import StocksTable from './StocksTable';

const setup = (stocks=[]) => {
  return shallow(<StocksTable stocks={stocks} />);
}

describe('StocksTable component', () => {
  test('should render without error', () => {
    const wrapper = setup([{ stockName: 'Apple', stockSymbol: 'AAPL', stockPrice: '313.05' }])
    const stocksTable = findByTestAttr(wrapper, 'component-stocks-table');
    expect(stocksTable.exists()).toBe(true);
  });
  describe('without stocks loaded', () => {
    test('should render loading spinner', () => {
     const wrapper = setup();
     const loadingSpinner = findByTestAttr(wrapper, 'loading-spinner');
     expect(loadingSpinner.exists()).toBe(true); 
    });
  });
  describe('with stocks loaded', () => {
    test('should render stocks table', () => {
      
    });
  });
});
