import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../../../test/testUtils';
import StockDetails from './';
import selectedStockContext from '../../contexts/selectedStockContext';
import hookActions from '../../actions/hookActions';

const mockGetStockQuote = jest.fn();

/**
 * Factory function to create a ShallowWrapper for the StockDetails component.
 * @function setup
 * @param {object} selectedStock - stock value specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (selectedStock=null) => {
  mockGetStockQuote.mockClear();
  hookActions.getStockQuote = mockGetStockQuote;

  const mockUseSelectedStock = jest.fn().mockReturnValue([selectedStock, jest.fn()]);
  selectedStockContext.useSelectedStock = mockUseSelectedStock;

  // use mount, because useEffect is not called on `shallow`
  return mount(<StockDetails />);
}

describe('StockDetails component', () => {
  describe('no stock selected', () => {
    test('should not render stock details', () => {
      const wrapper = setup();
      const stockDetailsComponent = findByTestAttr(wrapper, 'component-stock-details');
      expect(stockDetailsComponent.exists()).toBe(false);
    });
  });
  describe('stock selected but details still loading', () => {
    test('should render loading spinner', () => {
      const selectedStock = {
        stockName: 'Nike',
        stockSymbol: 'NKE',
        stockPrice: null
      }
      const wrapper = setup(selectedStock);
      const loadingSpinner = findByTestAttr(wrapper, 'loading-spinner');
      expect(loadingSpinner.exists()).toBe(true); 
    });
  });
  describe('stock selected', () => {
    let wrapper;
    beforeEach(() => {
      const selectedStock = {
        stockName: 'Nike',
        stockSymbol: 'NKE',
        stockPrice: 100.25
      }
      wrapper = setup(selectedStock);
    })
    test('should render component', () => {
      const stockDetailsComponent = findByTestAttr(wrapper, 'component-stock-details');
      expect(stockDetailsComponent.exists()).toBe(true);
    });
    test('should render correct details for selected stock', () => {
      const selectedStock = {
        stockName: 'Nike',
        stockSymbol: 'NKE',
        stockPrice: 100.25
      }
      const selectedStockNameNode = findByTestAttr(wrapper, 'selected-stock-name');
      expect(selectedStockNameNode.text()).toBe(selectedStock.stockName);
    });
    describe('`getStockQuote` action', () => {
      const selectedStock = {
        stockName: 'Nike',
        stockSymbol: 'NKE',
        stockPrice: null
      }
      test('should only call once if `selectedStock` has no price', () => {
        setup(selectedStock);
    
        // check to see if getStockQuote was called once
        expect(mockGetStockQuote.mock.calls.length).toBe(1);
      });
    });
  });
});
