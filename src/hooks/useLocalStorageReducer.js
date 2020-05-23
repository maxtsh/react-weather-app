import { useEffect, useReducer } from "react";

function useLocalStorageReducer(key, reducer, defaultValue) {
  // We will check for the default value in localStorage using init function of useReducer
  const [state, dispatch] = useReducer(reducer, defaultValue, () => {
    let value;
    try {
      value = JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch (err) {
      value = defaultValue;
    }
    return value;
  });

  // We only want this to run when the state data changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export default useLocalStorageReducer;
