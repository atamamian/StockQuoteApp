import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../test/testUtils';
import StocksTable from './StocksTable';

/**
 * Factory function to create a ShallowWrapper for the StocksTable component.
 * @function setup
 * @param {Array} stocks - stocks value specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (stocks=[]) => {
  return shallow(<StocksTable stocks={stocks} />);
}

describe('StocksTable component', () => {
  describe('without stocks loaded', () => {
    test('should render loading spinner', () => {
     const wrapper = setup();
     const loadingSpinner = findByTestAttr(wrapper, 'loading-spinner');
     expect(loadingSpinner.exists()).toBe(true); 
    });
  });
  describe('with stocks loaded', () => {
    let wrapper;
    const stocks = [
      { 
        stockName: 'Apple', 
        stockSymbol: 'AAPL', 
        stockPrice: 313.05
      },
    ]
    beforeEach(() => {
      wrapper = setup(stocks)
    })
    test('should render stocks table', () => {
      const stocksTable = findByTestAttr(wrapper, 'component-stocks-table');
      expect(stocksTable.exists()).toBe(true);
    });
    test('should render correct number of stocks', () => {
      const stockNodes = findByTestAttr(wrapper, 'stock-cell');
      expect(stockNodes.length).toBe(stocks.length);
    });
  });
});
