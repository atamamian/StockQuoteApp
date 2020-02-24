import React from 'react';

const selectedStockContext = React.createContext();

/**
 * @function useSelectedStock
 * @return {Array} selectedStockContext value, which is a state of [value, setter].
 */
function useSelectedStock() {
  const context = React.useContext(selectedStockContext);

  // throw an error if the context doesn't exist
  if(!context) {
    throw new Error('useSelectedStock must be used within a SelectedStockProvider');
  }

  // otherwise return the context
  return context;
}

/**
 * @function SelectedStockProvider
 * @param {object} props - props to pass through from declared component.
 * @return {JSX.Element} Provider component.
 */
function SelectedStockProvider(props) {
  // create state that will be used within the provider
  // initial state value is an empty object {}
  const [selectedStock, setSelectedStock] = React.useState(null);

  // value for the context provider will be array of [value, setter] for selectedStock state.
  const value = React.useMemo(() => [selectedStock, setSelectedStock], [selectedStock]);

  // Return a Provider component with the [value, setter] array as the value, passing through the props
  return <selectedStockContext.Provider value={value} {...props} />
}

export default {
  SelectedStockProvider,
  useSelectedStock
}