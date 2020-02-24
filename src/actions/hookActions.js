import axios from 'axios';

export const getStockQuote = async (stockSymbol, setStockQuote) => {
  const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=bp9hiv7rh5rf91tioih0`);

  if(!response.data) throw new Error(`Stock symbol not found: ${stockSymbol}`)

  setStockQuote(response.data);
}

export default {
  getStockQuote
}