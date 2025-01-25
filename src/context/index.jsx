import React, { createContext, useContext, useState } from "react";

const CountContext = createContext();

export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
};

export const CounterDisplay = () => {
  const { count } = useContext(CountContext);
  return <h1>{count}</h1>;
};

export const CounterButton = () => {
  const { setCount } = useContext(CountContext);

  return <button onClick={() => setCount((c) => c + 1)}>Increase</button>;
};
