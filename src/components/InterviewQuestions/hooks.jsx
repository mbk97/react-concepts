import React, { createContext, useContext, useState, useReducer } from "react";
// ! useState

// * State in React refers to the data that a component manages and uses to render itself. It allows components to be dynamic and interactive

// Local State: Managed within a single component (e.g., using useState).
// Global State: Shared across multiple components (e.g., using Context API, Zustand, Redux, or MobX).
// Server State: Data fetched from a server and used in the UI (e.g., managed with React Query or SWR).
// URL State: Data stored in the URL (e.g., query parameters, path segments).

// ** Complex State with useReducer

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}

//* Global State Management

// Context API
// Use for sharing data across components without prop drilling.
// Best for lightweight state management.

const CountContext = createContext();

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

function CounterDisplay() {
  const { count } = useContext(CountContext);
  return <p>{count}</p>;
}

function CounterButton() {
  const { setCount } = useContext(CountContext);
  return <button onClick={() => setCount((c) => c + 1)}>Increment</button>;
}

export default function App() {
  return (
    <CounterProvider>
      <CounterDisplay />
      <CounterButton />
    </CounterProvider>
  );
}

// ** State Management Libraries

// Zustand: Lightweight and simple.
// Redux Toolkit: For robust and large-scale applications.
// Recoil: Experimental, with a declarative API for state sharing.
// MobX: Reactive state management.

// ** Best Practices for State Management
// Minimize State: Only keep what's necessary in the state.
// Derive State When Possible: Avoid storing redundant derived values.
// Co-locate State: Keep state as close as possible to where it's used.
// Use Immutable Updates: Always return a new object/array when updating state.
// Split State by Concerns: Break large states into smaller, manageable pieces.
// Avoid Overuse of Context: Don’t use Context API for high-frequency updates.
// Prefer Libraries for Server State: Use tools like React Query for server-side state to manage caching, synchronization, and stale data.

// ** Avoiding multiple useState calls for related pieces of data, as shown in your first example, is generally preferred because managing state in a single object (as in the second example) is more scalable, organized, and easier to work with

// ! Avoid
const [user, setUser] = useState("");
const [age, setAge] = useState("");
const [phone, setPhone] = useState("");

// * Do This
const [inputData, setInputData] = useState({
  user: "",
  age: "",
  phone: "",
});

// When to Use Multiple useState Calls

// ** While using a single state object is often advantageous, there are cases where multiple useState calls make sense:

// Unrelated State Variables: If state variables are completely independent (e.g., isLoggedIn, themeColor), using separate useState calls improves clarity.

// Optimization for Frequent Updates: If one piece of state updates frequently and others rarely, separating them may avoid unnecessary re-renders.

// * Pitfalls of a Single State Object

// Forgetting to spread the previous state (...prev) can overwrite other fields

//* BUG: setInputData({ user: "John" }); // This removes age and phone from the state

//* Correct:  setInputData((prev) => ({ ...prev, user: "John" }));
