import React from 'react';

import selectedStockContext from '../../contexts/selectedStockContext';
import hookActions from '../../actions/hookActions';

const StockDetails = () => {
  const [selectedStock, setSelectedStock] = selectedStockContext.useSelectedStock();

  React.useEffect(
    () => { hookActions.getStockQuote(selectedStock, setSelectedStock) }, [selectedStock]
  )

  if (!selectedStock) {
    return null
  }

  if (!selectedStock.stockPrice) {
    return (
      <div data-test="loading-spinner" className="container">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading stock details</p>
      </div>
    )
  }

  return(
    <div data-test="component-stock-details" className="container">
      <h1 data-test="selected-stock-name">{selectedStock.stockName}</h1>
      <h3>{selectedStock.stockSymbol}</h3>
      <p>{`Current price: ${selectedStock.stockPrice}`}</p>
    </div>
  )
}

export default StockDetails;