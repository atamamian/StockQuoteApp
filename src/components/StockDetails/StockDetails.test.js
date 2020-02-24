import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../../../test/testUtils';
import StockDetails from './StockDetails';

/**
 * Factory function to create a ShallowWrapper for the StockDetails component.
 * @function setup
 * @param {object} stock - stock value specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (stock=null) => {
  return shallow(<StockDetails stock={stock} />);
}

const selectedStock = {
  stockName: 'Apple',
  stockSymbol: 'AAPL',
  stockPrice: 313.05
}

test('should pass `checkProps` run', () => {
  checkProps(StockDetails, selectedStock);
});

describe('StockDetails component', () => {
  describe('no stock selected', () => {
    test('should not render stock details', () => {
      const wrapper = setup();
      const stockDetailsComponent = findByTestAttr(wrapper, 'component-stock-details');
      expect(stockDetailsComponent.exists()).toBe(false);
    });
    test('should render loading spinner', () => {
      const wrapper = setup();
      const loadingSpinner = findByTestAttr(wrapper, 'loading-spinner');
      expect(loadingSpinner.exists()).toBe(true); 
    });
  });
  describe('stock selected', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup(selectedStock);
    })
    test('should render component', () => {
      const stockDetailsComponent = findByTestAttr(wrapper, 'component-stock-details');
      expect(stockDetailsComponent.exists()).toBe(true);
    });
    test('should render correct details for selected stock', () => {
      const selectedStockNameNode = findByTestAttr(wrapper, 'selected-stock-name');
      expect(selectedStockNameNode.text()).toBe(selectedStock.stockName);
    });
  });
});

