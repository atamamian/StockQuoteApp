import moxios from 'moxios';

import { getStockQuote } from './hookActions';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should not run if no `selectedStock` exists', async () => {
    const selectedStock = null;

    // create mock for callback arg
    const mockSetSelectedStock = jest.fn();

    await getStockQuote(selectedStock, mockSetSelectedStock);

    // expect mock not to run due to empty `selectedStock`
    expect(mockSetSelectedStock).not.toHaveBeenCalled();
  });

  test('should call the getStockQuote callback on axios response', async () => {
    const selectedStock = { stockName: 'Nike', stockSymbol: 'NKE', stockPrice: null };
    const selectedStockQuote = { "c": 100.25 };

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
    expect(mockSetSelectedStock).toHaveBeenCalledWith({ ...selectedStock, stockPrice: `$${parseFloat(selectedStockQuote["c"].toFixed(2))}` });
  });
});
