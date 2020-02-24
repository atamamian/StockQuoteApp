import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../test/testUtils';
import StockDetails from './StockDetails';
import selectedStockContext from '../../contexts/selectedStockContext';

/**
 * Factory function to create a ShallowWrapper for the StockDetails component.
 * @function setup
 * @param {object} selectedStock - stock value specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (selectedStock=null) => {
  const mockUseSelectedStock = jest.fn().mockReturnValue([selectedStock, jest.fn()]);
  selectedStockContext.useSelectedStock = mockUseSelectedStock;
  return shallow(<StockDetails />);
}

const selectedStock = {
  stockName: 'Apple',
  stockSymbol: 'AAPL',
  stockPrice: 313.05
}

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

