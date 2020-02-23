import React from 'react';

const StocksTable = ({ stocks }) => {

  if(!stocks.length) {
    return (
      <div data-test="loading-spinner" className="container">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading stocks</p>
      </div>
    )
  }

  return (
    <div data-test="component-stocks-table">
      <table className="table table-md">

      </table>
    </div>
  )
}

export default StocksTable;