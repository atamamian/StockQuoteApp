import React from 'react';
import PropTypes from 'prop-types';

const StockDetails = ({ stock }) => {
  if (!stock) {
    return null;
  }

  return(
    <div data-test="component-stock-details" className="container">
      <h1 data-test="selected-stock-name">{stock.stockName}</h1>
      <h3>{stock.stockSymbol}</h3>
      <p>{`Current price: ${stock.stockPrice}`}</p>
    </div>
  )
}

StockDetails.propTypes = {
  stock: PropTypes.shape({
    stockName: PropTypes.string.isRequired,
    stockSymbol: PropTypes.string.isRequired,
    stockPrice: PropTypes.number.isRequired
  })
}

export default StockDetails;