import React from 'react';

import StocksTable from './components/StocksTable';
import StockDetails from './components/StockDetails';
import selectedStockContext from './contexts/selectedStockContext';
import stocksList from './helpers/stocksList';

function App() {
  const stocks = stocksList;

  return (
    <div data-test="component-app" className="container mx-auto mt-4">
      <h1 className="text-center">Stock Quote App</h1>
      <selectedStockContext.SelectedStockProvider>
        <StocksTable stocks={stocks} />
        <StockDetails />
      </selectedStockContext.SelectedStockProvider>
    </div>
  );
}

export default App;