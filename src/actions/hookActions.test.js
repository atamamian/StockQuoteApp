import moxios from 'moxios';

import { getStockQuote } from './hookActions';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should call the getStockQuote callback on axios response', async () => {
    const selectedStock = { stockName: 'Apple', stockSymbol: 'AAPL', stockPrice: null };
    const selectedStockQuote = { "c": 313.05 };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: selectedStockQuote,
      });
    });

    // create mock for callback arg
    const mockSetSelectedStock = jest.fn();

    await getStockQuote(selectedStock, mockSetSelectedStock);

    // see if mock was run with correct argument
    expect(mockSetSelectedStock).toHaveBeenCalledWith({ ...selectedStock, stockPrice: selectedStockQuote["c"] });
  });
});
