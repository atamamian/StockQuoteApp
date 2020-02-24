import React from 'react';

const StocksTable = ({ stocks }) => {

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
    <td data-test="stock-cell" key={stock.stockSymbol} className="align-middle">
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