import React from 'react';

import selectedStockContext from '../../contexts/selectedStockContext';

const StocksTable = ({ stocks }) => {
  const [selectedStock, setSelectedStock] = selectedStockContext.useSelectedStock();

  if(stocks.length === 0) {
    return (
      <div data-test="loading-spinner" className="container">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading stocks</p>
      </div>
    )
  }

  const stockCells = stocks.map((stock) => (
    <td 
      data-test="stock-cell" 
      key={stock.stockSymbol} 
      className="align-middle"
      onClick={() => setSelectedStock({ ...stock })}
    >
      {stock.stockName}
      <br/>
      <span className="text-secondary">{`(${stock.stockSymbol})`}</span>
    </td> 
  ))

  return (
    <div data-test="component-stocks-table" className="container">
      <table className="table table-md">
        <tbody>
          { stockCells }
        </tbody>
      </table>
    </div>
  )
}

export default StocksTable;