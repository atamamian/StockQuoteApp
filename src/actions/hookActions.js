import axios from 'axios';

export const getStockQuote = async (selectedStock, setSelectedStock) => {
  if(!selectedStock) return;

  const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${selectedStock.stockSymbol}&token=bp9hiv7rh5rf91tioih0`);

  if(!response.data) throw new Error(`Stock symbol not found: ${selectedStock.stockSymbol}`)

  setSelectedStock({ ...selectedStock, stockPrice: `$${parseFloat(response.data["c"].toFixed(2))}` });
}

export default {
  getStockQuote
}