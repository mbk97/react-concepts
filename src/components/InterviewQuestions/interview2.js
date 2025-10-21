// ! --legacy-peer-deps tells npm to ignore version conflicts between packages — for example, when one package needs an older React version and another needs a newer one — allowing everything to install even if their dependencies don’t match.

// ! useEffect
//**  useEffect is a hook that allows you to perform side effects in functional components. Side effects could include:

//**  Fetching data from an API
//*   Subscribing to events (e.g., window resize)
//*   Directly manipulating the DOM
//*   Setting up timers

// ! There are 3 Phases involved in the useEffect hook

// ** 1. Mounting Phase
// These actions are side effects because they don’t directly contribute to rendering the UI but affect it indirectly

// ** Behind the scenes, here's what happens:
// Render Phase: React renders the component. During this phase, useEffect is registered but does not run immediately. It gets scheduled to run after the browser paints the UI.

// Commit Phase: After the render phase, React "commits" the changes to the DOM, making the UI update visible to the user. Then, the useEffect callback runs, executing the side effect.

// ** 2. Updating Phase

// When the component re-renders (due to state or prop changes), React checks the dependency array of each useEffect:

// ** If any value in the array has changed since the last render, the effect is triggered again.

// ** If no dependencies have changed, the effect is skipped.

// ** 3.  Unmounting Phase (Component Unmount)

// When a component is about to unmount (e.g., navigating away or conditionally removing the component from the DOM), React will run the cleanup function (if provided) to ensure that any side effects are properly cleaned up

//! useLayoutEffect

//* This means it runs immediately after the DOM has been updated but before the user sees those changes.

// ** Ideal for cases where you need to measure layout, perform operations that need to be reflected in the current frame, or make immediate DOM manipulations that affect layout.

// ! useReducer hook and complex state management

// ** The useReducer hook in React is a great alternative to useState when managing more complex state logic, especially when the state depends on previous values or there are multiple actions that can affect it. It’s similar to Redux but scoped to a single component (or can be shared using a context)

// Basic Example

import React, { useReducer } from "react";

const initialState = { count: 0 };

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
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </div>
  );
}

//**  Concepts

// Initial state (initialState): This defines the starting values of the state.

// Reducer function (reducer): This function receives the current state and an action, and returns a new state based on the action.

// Dispatch (dispatch): This function is used to send actions to the reducer.

// Action object: Typically, an action has a type property (describing what kind of action it is) and an optional payload that can hold additional data.

//** When to use useReducer over useState:

// When you have multiple pieces of related state that change together.

// When the state logic is complex (e.g., nested or interdependent states).

// When the next state depends on the previous state.

// When you want centralized state management for better scalability.

// ** Example: Complex State Management

const initialStateTwo = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: {},
};

function reducer2(state, action) {
  switch (action.type) {
    case "SET_FIELD_VALUE":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: { ...state.errors, ...action.errors },
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

function SignupForm() {
  const [state, dispatch] = useReducer(reduce2, initialStateTwo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD_VALUE", field: name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (state.password !== state.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
    } else {
      // Proceed with the form submission
      console.log("Form data:", state);
      dispatch({ type: "RESET_FORM" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={state.username}
        onChange={handleInputChange}
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        value={state.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={state.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <input
        type="password"
        name="confirmPassword"
        value={state.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm Password"
      />
      {state.errors.confirmPassword && <p>{state.errors.confirmPassword}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
}

// ! useRef for DOM and instance variable

// The useRef hook in React serves two main purposes:

// Accessing DOM elements.

// Maintaining mutable instance variables (values that persist across renders without causing a re-render).

// ** When you need to directly interact with a DOM element (like focusing an input or controlling a video element), useRef allows you to obtain a reference to that element.

function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const handleFocus = () => {
    // Access the DOM node directly and focus the input
    inputEl.current.focus();
  };

  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={handleFocus}>Focus the input</button>
    </div>
  );
}

// * Key points
// useRef returns an object with a current property that initially points to null but later is updated to point to the DOM node.

// You can use this reference to directly call DOM methods (like .focus(), .scrollIntoView(), etc.).

// The ref does not cause re-renders when its value is changed.

// ! Using useRef as an Instance Variable

//* useRef can also be used to store values that persist between renders but do not trigger re-renders when they change. This is useful for variables like timers, IDs, or any value that you want to update without causing the component to re-render.

import { useRef, useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timerRef.current); // Cleanup on component unmount
  }, []);

  const stopTimer = () => {
    clearInterval(timerRef.current); // Stop the timer
  };

  return (
    <div>
      <p>{seconds} seconds have passed.</p>
      <button onClick={stopTimer}>Stop Timer</button>
    </div>
  );
}

// ! React Lazy

//** React.lazy is a built-in function in React that enables code-splitting by dynamically importing components. This helps improve the performance of your app by only loading the components when they are needed (on-demand loading).

// usage
import { Suspense } from "react";

// Dynamically import the component
const LazyComponent = React.lazy(() => import("./LazyComponent"));

function App() {
  return (
    <div>
      {/* Use Suspense to handle the loading state */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;

//* React.lazy(() => import('./LazyComponent')): This dynamically imports the LazyComponent only when it is rendered.

//* Suspense: It is required when using React.lazy to show a fallback (e.g., a loading spinner or message) while the component is being loaded.

//** Benefits:
// Improved Load Time: Only the components that are currently needed are loaded, improving the initial load time of your app.

// On-Demand Loading: Non-critical components are loaded when required, like when navigating to a new page.

//**  Best Practices

// Use React.lazy with React Router to split routes dynamically.
// Ensure you handle errors for failed dynamic imports by catching them or using error boundaries.

//! Suspense and SuspenseList

// ** Suspense
// Suspense is a component that lets you specify a fallback UI (e.g., a loading spinner) to display while a child component is loading.

<Suspense fallback={<div>Loading component...</div>}>
  <LazyComponent />
</Suspense>;

// Fallback Prop: The fallback prop in Suspense defines what will be shown while the child components are being fetched.

// Asynchronous Boundaries: Suspense introduces an asynchronous boundary, meaning everything inside the Suspense block waits until the child is ready.

//** SuspenseList

// SuspenseList is used to orchestrate the rendering order of multiple Suspense components. It helps manage the sequencing of loading indicators for multiple components that may be suspended.

//**  Use Cases:
// When you want to load a list of lazy components in a specific order.
// When you need to group components and ensure they display either simultaneously or in a specific loading order.

import { SuspenseList } from "react";

// Lazy-load multiple components
const LazyComponentA = React.lazy(() => import("./LazyComponentA"));
const LazyComponentB = React.lazy(() => import("./LazyComponentB"));

function Aphp() {
  return (
    <div>
      <SuspenseList revealOrder="together" tail="collapsed">
        <Suspense fallback={<div>Loading Component A...</div>}>
          <LazyComponentA />
        </Suspense>
        <Suspense fallback={<div>Loading Component B...</div>}>
          <LazyComponentB />
        </Suspense>
      </SuspenseList>
    </div>
  );
}

// * Key Props for SuspenseList:
//* revealOrder:

// together: All components inside the SuspenseList will be revealed together once they are all ready.

// forwards: Reveals children in order (top to bottom), waiting for each child to load before rendering the next.

// backwards: Reveals children in reverse order (bottom to top).

//* tail:
// collapsed: This hides the loading indicators (i.e., fallback UI) for the items that come later in the list.
// hidden: This reveals the loaded items without showing fallback UI for later items.

//!  Error boundaries vs try-catch in hooks

//** Error Boundaries:

// Purpose: Error boundaries catch rendering errors in components, lifecycle methods, and their descendants. They are particularly useful for catching errors that occur during rendering, in child components, or inside event handlers.

//**  Pros:
// Catches render-time errors across the component tree.
// Useful for large-scale component error handling.
// Can display a fallback UI when an error is caught.

//* Cons:
// Does not catch errors in event handlers or asynchronous code (you need to handle those separately).

//**  try-catch in Hooks:
// Purpose: A try-catch block in hooks is used to handle errors in synchronous code or inside asynchronous logic (e.g., API calls) when you're dealing with specific operations like fetching data or executing functions.

// ** Key Differences:
//! Error boundaries are broader and handle rendering errors throughout the component tree.

//! try-catch in hooks is more focused on handling errors in specific blocks of logic, like API calls or synchronous operations.

// ! React state batching (concurrent updates)

// ** React's state batching is an optimization where multiple state updates are grouped (or batched) together and applied in one re-render instead of triggering multiple renders. This behavior helps improve performance, especially when there are frequent state changes, by minimizing the number of re-renders.

//! Lifting state up

//** Lifting state up in React refers to the pattern of moving state from one or more child components to their common parent, so the parent can manage the state and pass it down as props to those children. This is commonly used when multiple components need to share and synchronize state.

// ** Why Lift State Up?
// When multiple components need to reflect the same changing data, instead of duplicating state in each component, you can lift the state up to their nearest common ancestor. This centralizes the state management and allows components to stay in sync by using the shared state passed down as props.

function InputComponent({ inputValue, handleInputChange }) {
  return (
    <input
      value={inputValue}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
}

function DisplayComponent({ displayValue }) {
  return <p>{displayValue}</p>;
}

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  return (
    <div>
      <InputComponent
        inputValue={inputValue}
        handleInputChange={handleInputChange}
      />
      <DisplayComponent displayValue={inputValue} />
    </div>
  );
}
