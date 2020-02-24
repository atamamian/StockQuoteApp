import moxios from 'moxios';

import { getStockQuote, getSymbolsList, getCompanyProfile } from './hookActions';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should call the getStockQuote callback on axios response', async () => {
    const stockQuote = { stockName: 'Apple', stockSymbol: 'AAPL', stockPrice: 313.05 };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: stockQuote,
      });
    });

    // create mock for callback arg
    const mockSetStockQuote = jest.fn();

    await getStockQuote(stockQuote.stockSymbol, mockSetStockQuote);

    // see if mock was run with correct argument
    expect(mockSetStockQuote).toHaveBeenCalledWith(stockQuote);
  });
});
