// ! 1. React Core Concepts

// ** Components: They are the building blocks of React applications. They allow you to split the UI into independent, reusable pieces.

// ** A React element is a plain object that describes what you want to see on the screen. It is the result of invoking a React component (or using JSX syntax).

// ** Types

//   Functional Components: These are JavaScript functions that return React elements.
//   Class Components: These are JavaScript classes that extend React.Component.

// **  JSX (JavaScript XML)

//  JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.

//  Why Use It: It makes the code easier to understand and write. Behind the scenes, JSX is transpiled into regular JavaScript calls to React.createElement().

// ** Props (Properties)

// They allows us pass data between components (From parent to child)

// ** State

//  State is used to store data that changes within a component, such as user input or API

// ** Conditional Rendering

// React allows you to conditionally render elements or components based on some logic.

//! 2. Reconcilation Algorithm

// ** The reconciliation algorithm in React is the process of updating the UI efficiently when the component’s state or props change. React compares the current virtual DOM with the previous one and determines the minimum number of changes necessary to update the actual DOM.

// The reconciliation algorithm is governed by the following key principles:

//**  Virtual DOM Comparison: React creates a new virtual DOM and compares it to the previous version.

// **  Element Type Matching: If elements have the same type, React updates the existing DOM node. If the type differs, React replaces the entire subtree.

// **  Keys for Lists: React uses unique keys to efficiently track changes in lists, identifying added, removed, or reordered elements.

//**  Component Updates: React re-renders components only if their state or props change, using shouldComponentUpdate or React.memo() to skip unnecessary renders.

// ** Fiber and Priority: With React Fiber, rendering is split into small chunks, allowing React to prioritize tasks and provide a smoother, more responsive UI.

// These optimizations ensure that React updates only the parts of the UI that have changed, minimizing DOM manipulation and improving performance.

// ! Virtual DOM
// ** The virtual DOM is a lightweight copy of the real DOM that allows React to manage changes more efficiently by minimizing the direct manipulation required on the real DOM. This process significantly enhances the performance of web apps.

// How the virtual DOM works

// ** Initial Rendering:  when the app starts, the entire UI is represented as a Virtual DOM. React elements are created and rendered into the virtual structure.

//**  State and Props Changes: as the states and props change in the app, React re-renders the affected components in the virtual DOM. These changes do not immediately impact the real DOM.

//** Comparison Using Diff Algorithm: React then uses a diffing algorithm to compare the current version of the Virtual DOM with the previous version. This process identifies the differences (or "diffs") between the two versions.

//**  Reconciliation Process: based on the differences identified, React determines the most efficient way to update the real DOM. Only the parts of the real DOM that need to be updated are changed, rather than re-rendering the entire UI. This selective updating is quick and performant.

//** Update to the Real DOM: finally, React applies the necessary changes to the real DOM. This might involve adding, removing, or updating elements based on the differences detected in step 3.

// ! Handling events in React

// * React uses a synthetic event system that ensures events behave consistently across different browsers

// ! Handling form state in React
//**  Key Concepts:

// ** Form State: The form's state is managed by React's useState (or useReducer in complex cases). Each input field’s value is tied to the component state, which is updated on change.

// ** Controlled Components: In React, form elements (e.g., input, textarea) are typically controlled components, meaning their values are controlled by the state.

// ! React Portals

//**  portals provide a way to render children into a different part of the DOM than their parent component.

//**  This can be useful for elements that need to break out of their parent container’s hierarchy, such as modals, tooltips, dropdowns, or any UI component that requires positioning outside the normal DOM tree.

// Creating a Portal
// To create a portal, you can use the ReactDOM.createPortal() function. This function takes two arguments:

// The JSX to render (the child component).
// A DOM node where you want to render the component.

// ** ReactDOM.createPortal(child, container)

// child: The JSX to render.
// container: The DOM element where the child should be rendered.

// * Example
// Suppose you want to render a modal outside the component where it is defined in the DOM tree.

// ** <div id="root"></div>
// ** <div id="modal-root"></div>

import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div style={modalStyle}>
      <div>{children}</div>
      <button onClick={onClose}>Close</button>
    </div>,
    document.getElementById("modal-root"), // Rendered outside of the root div
  );
};

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  zIndex: 1000,
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <h1>Portal Example</h1>
      <button onClick={toggleModal}>Open Modal</button>

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <h2>This is a modal!</h2>
        </Modal>
      )}
    </div>
  );
};

export default App;

// ** Use Cases
//  Ensure the tooltip is displayed above all other elements.
// To escape the parent’s CSS styling or DOM hierarchy.
// To render a component outside of the React tree.

// ! Error boundaries

// ** Error Boundaries in React are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application. Error boundaries catch errors during rendering, in lifecycle methods, and in constructor methods of the whole tree below them.

// ! React rendering behavior (re-renders and why)

// ! Why Components Re-render

// ** State Changes: When a component’s state changes using setState (or equivalent hooks like useState), React schedules a re-render of that component.

//**  Props Changes: When a component receives new props, it will re-render. This is because React needs to ensure that the component displays the latest data.

// ** Context Changes: If a component is consuming context via useContext or Context.Consumer, a change in the context value will trigger a re-render of all components that use that context.

// ** Parent Component Re-renders: If a parent component re-renders, all its children to re-render

//! Optimizing Re-renders

//**  React.memo: For functional components, React.memo can be used to prevent re-renders if the props haven't changed. It performs a shallow comparison by default.

//** shouldComponentUpdate: For class components, you can implement shouldComponentUpdate to control whether a component should re-render. This method receives the next props and state and returns a boolean.

//** useCallback and useMemo: These hooks help optimize performance by memoizing functions and values respectively, preventing unnecessary re-renders caused by inline function definitions or computed values.

// ** Key Prop: When rendering lists, ensure that each item has a unique key prop. This helps React efficiently identify which items have changed, added, or removed.

// ! JSX

//** JSX: A syntax extension that looks like HTML.
//* Transformation: JSX is compiled to JavaScript using React.createElement.
//* Element Creation: React.createElement creates a JavaScript object representing the element.

// ! React Strict Mode

// * Purpose: Helps identify potential issues and ensure best practices.
// * Usage: Wrap parts of your application in React.StrictMode during development.
// * Checks: Includes warnings for unsafe lifecycle methods, legacy string refs, deprecated APIs, and unexpected side effects.
// * Using StrictMode is a good practice to help future-proof your React applications and catch issues early in the development process.

// ! React Memo

// * React.memo is a higher-order component for optimizing performance in functional components. It helps prevent unnecessary re-renders by memoizing the output of a component.

// ** It only re-renders the component if its props change. If the props remain the same, React skips rendering and reuses the last rendered result.

// ! Examples of Higher Order Components

// import React from 'react';

// const MyComponent = React.memo((props) => {
//   // Component logic and rendering
//   return <div>{props.value}</div>;
// });

// ! How React.memo Works

//* Shallow Comparison: By default, React.memo performs a shallow comparison of the props. This means it checks if the props' reference has changed (i.e., for objects, arrays, or functions, it compares references rather than deep equality).

//* Custom Comparison Function: You can provide a custom comparison function as the second argument to React.memo if you need more control over when the component should re-render

// !  PureComponent and shallow comparison

//** PureComponent is a base class in React that helps optimize component rendering by implementing a shallow comparison of props and state.

// How it works

//** Shallow Comparison: PureComponent implements shouldComponentUpdate() with a shallow comparison of props and state. This means it only checks if the references to props and state have changed, rather than performing a deep comparison.

// ** Usage: It’s useful when you want to avoid unnecessary re-renders of a component if its props and state haven’t changed. This can improve performance, especially in large or complex applications.

// ! shouldComponentUpdate vs React.memo

//** shouldComponentUpdate is a lifecycle method used in class components to control whether a component should re-render when props or state change.

//** You can implement your own custom logic inside shouldComponentUpdate to determine if the component should update. This allows for fine-grained control over how you compare props and state.

class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Custom comparison logic
    if (nextProps.value !== this.props.value) {
      return true; // Re-render if the value has changed
    }
    return false; // Skip re-render otherwise
  }

  render() {
    return <div>{this.props.value}</div>;
  }
}

// ** React Memo: React.memo is a higher-order component (HOC) used to optimize functional components by memoizing the result. It automatically skips re-rendering if the props haven't changed (via shallow comparison).

// ** By default, React.memo performs a shallow comparison of the component's props. If none of the props have changed (i.e., they’re shallowly equal), the component will not re-render.

//! Render Props Pattern

// ** The Render Props pattern in React is a technique for sharing code between components by passing a function as a prop. This function controls what should be rendered, allowing you to abstract and reuse functionality in various components.

import React, { useState, useEffect } from "react";

// DataFetcher component using render props to pass down fetched data
const DataFetcher = ({ url, render }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return <>{loading ? <p>Loading...</p> : render(data)}</>;
};

// Usage example
const AppT = () => {
  return (
    <DataFetcher
      url="https://jsonplaceholder.typicode.com/posts"
      render={(data) => (
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    />
  );
};

//! Controlled vs Uncontrolled components

//! Controlled Component

//** In a controlled component, form data is handled by the component's state. The value of the form element is set explicitly via state, and every change triggers an event that updates the state.

//** The component fully controls the input and its value through props or state, making the form element always synced with the component's state.

function ControlledForm() {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
}

// ** Advantages:
// Easy to validate and manipulate input data.
// The component has full control over the input state.

// ** Disadvantages:
// Can lead to more boilerplate code.
// May introduce performance issues if many components are constantly re-rendering.

// ! Uncontrolled Components

//** In an uncontrolled component, the form data is handled by the DOM itself rather than the component's state. Instead of using state to store the form data, you access the input value using refs

function UncontrolledForm() {
  const inputRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}

//** Advantages:
// Simpler, less code for simple use cases.
// Potentially faster as it avoids frequent re-rendering for input updates.

// ** Disadvantages:
// Harder to validate and manipulate input data.
// Not ideal for complex form scenarios.

//! Handling NON-UI Side Effects

// ** Dependency arrays in useEffect: Always include all dependencies in the array to ensure your side effects run as expected.

// ** Cleanup functions: Always return cleanup functions in useEffect to avoid memory leaks.

// ** Use libraries when scaling: For large-scale applications, consider using libraries like React Query, Redux, or Zustand for managing side effects more efficiently.

// *  Debouncing and Throttling

// ** Sometimes, you want to limit how frequently side effects run. Debouncing (delaying execution until a period of inactivity) and throttling (limiting the rate of execution) are common strategies, especially for non-UI events like window resizing or scroll events.
