import React from 'react';
import { shallow } from 'enzyme';

import selectedStockContext from './selectedStockContext';

// a functional component that calls useSuccess for our tests
const FunctionalComponent = () => {
  selectedStockContext.useSelectedStock();
  return <div />
}

test('should throw error when calling useSelectedStock outside SelectedStockProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useSelectedStock must be used within a SelectedStockProvider');
});

test('should not throw error when calling useSelectedStock inside SelectedStockProvider', () => {
  expect(() => {
    shallow(
      <selectedStockContext.SelectedStockProvider>
        <FunctionalComponent />
      </selectedStockContext.SelectedStockProvider>
      )
  }).not.toThrow('useSelectedStock must be used within a SelectedStockProvider');
});
