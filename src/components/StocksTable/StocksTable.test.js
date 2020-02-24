import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../../test/testUtils';
import selectedStockContext from '../../contexts/selectedStockContext';
import StocksTable from './';

const mockSetSelectedStock = jest.fn();

/**
 * Factory function to create a ShallowWrapper for the StocksTable component.
 * @function setup
 * @param {Array} stocks - stocks value specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (stocks=[], selectedStock={}) => {
  const mockUseSelectedStock = jest.fn().mockReturnValue([selectedStock, mockSetSelectedStock]);
  selectedStockContext.useSelectedStock = mockUseSelectedStock;

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
        stockName: 'Nike', 
        stockSymbol: 'NKE', 
        stockPrice: null
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
  describe('stock selection events', () => {
    let wrapper;
    const stocks = [
      { 
        stockName: 'Nike', 
        stockSymbol: 'NKE', 
        stockPrice: null
      },
    ]
    beforeEach(() => {
      wrapper = setup(stocks, {})
    })
    test('should call `setSelectedStock` on stock cell click', () => {
      mockSetSelectedStock.mockClear();
      const stockCell = findByTestAttr(wrapper, 'stock-cell');
      stockCell.simulate('click');
      expect(mockSetSelectedStock.mock.calls.length).toBe(1);
    });
    test('should update `selectedStock` on stock cell click', () => {
      const stockCell = findByTestAttr(wrapper, 'stock-cell');
      stockCell.simulate('click');
      expect(mockSetSelectedStock).toHaveBeenCalledWith({ ...stocks[0] })
    });
  });
});
