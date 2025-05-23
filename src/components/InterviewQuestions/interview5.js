// ! Infinite Scrolling

// * Infinite scrolling is a technique used to load data as the user scrolls down a page, improving performance by loading data in chunks.

import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.example.com/users`, {
        params: { page, limit: 10 },
      });
      setUsers((prevUsers) => [...prevUsers, ...response.data]);
      setHasMore(response.data.length > 0); // If no more data, stop fetching
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Infinite scrolling detection
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      {loading && <p>Loading more users...</p>}
    </div>
  );
}

// !  Long polling and real-time updates in React

// * Long polling and real-time updates are common techniques used to keep a React application synchronized with the server. These techniques ensure that the client can receive updates from the server either continuously or after regular intervals.

// * Long polling is a technique where the client sends an HTTP request to the server and waits until the server has new information. When the server responds with data, the client immediately sends another request, creating a loop. This is a basic alternative to WebSockets for real-time updates.

//  Example
function LongPollingComponent() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const pollServer = async () => {
    try {
      const response = await axios.get("https://api.example.com/messages");
      setMessages((prevMessages) => [...prevMessages, ...response.data]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
      // Poll the server again after receiving data
      setTimeout(pollServer, 5000); // 5 seconds interval
    }
  };

  useEffect(() => {
    pollServer(); // Start polling
    return () => clearTimeout(pollServer); // Cleanup on component unmount
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
}

// Key Points:

//* Polling Interval: You can control the polling interval using setTimeout. In the example, the polling interval is set to 5 seconds.

//* Continuous Polling: After each successful request, the client immediately starts a new request.

//* Error Handling: Handle errors gracefully, possibly using retry mechanisms if necessary.

// ! Real-Time Updates with WebSockets

// * WebSockets are a better approach for real-time updates because they provide full-duplex communication between the client and server. Unlike long polling, WebSockets maintain a constant connection, allowing the server to push updates to the client immediately.

// ! Frontend websockets set up

const socket = io("http://localhost:3000"); // Replace with your server URL

function WebSocketComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for 'newMessage' event from server
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on unmount
    return () => socket.off("newMessage");
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

// ! backend setup
const io = require("socket.io")(3000, {
  cors: {
    origin: "*", // Allow any origin for simplicity
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Simulate sending a message every 5 seconds
  setInterval(() => {
    socket.emit("newMessage", `Message at ${new Date().toLocaleTimeString()}`);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// ! Cancelling API requests in component

// ** In React, you may need to cancel an API request when a component unmounts to avoid potential memory leaks or errors if the request resolves after the component is no longer present.

// ** React Query will automatically cancel any in-flight requests when the component unmounts or the query is no longer needed.

// Axios example

import { useEffect, useState } from "react";
import axios from "axios";

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data", {
          cancelToken: source.token,
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel("Request canceled because component unmounted.");
    };
  }, []);

  return loading ? <p>Loading...</p> : <div>{JSON.stringify(data)}</div>;
}

// * Advanced styling in React involves techniques and tools that allow for more flexibility, scalability, and maintainability when dealing with complex UI components.

//* CSS-in-JS libraries, like styled-components and Emotion, are popular tools that allow you to write CSS styles directly within JavaScript files. These libraries enhance the way styles are handled in React applications, offering benefits like scoped styles, theming, dynamic styling, and easier component-driven development.

// Why Use CSS-in-JS Libraries?

//* Component-Scoped Styles: These libraries ensure that styles are scoped to individual components, preventing global style conflicts common with traditional CSS files.

//* Dynamic Styling: CSS-in-JS libraries allow styles to be computed dynamically using JavaScript. This means you can change the styles based on props, state, or any other logic directly in the component.

//* Theming Support: Both Styled-Components and Emotion come with built-in theme management via ThemeProvider. This makes it easy to implement global themes across the application and switch between light and dark modes, or apply brand-specific styling.

//* Enhanced Readability: Styles are colocated with components, making it easier to maintain and understand how a component looks and behaves.

//* CSS Features: These libraries support all CSS features such as pseudo-classes, animations, media queries, and nesting, providing a familiar development experience for anyone used to writing CSS.

//* Server-Side Rendering (SSR): Styled-Components and Emotion offer SSR support, which is especially useful when building React apps with Next.js or other SSR setups.

// Differences between Styled-Components and Emotion

//* Performance: Emotion tends to be slightly faster and more lightweight than Styled-Components, as it generates optimized CSS at runtime.

//* API: Emotion provides two styling options—styled and css, while Styled-Components focuses mainly on the styled API.

//* Use Case: If you need more flexibility with inline styles (css), Emotion is a better choice. If you prefer sticking with a simpler API (styled), Styled-Components offers a great developer experience.

// ! CSS modules vs inline styles
// CSS Modules are ideal for large, maintainable, and reusable styles with full access to CSS features. They help avoid naming collisions and can be optimized by the browser's caching mechanisms.

// Inline Styles are great for dynamic, component-specific styling that can change based on props or state but are limited in terms of advanced CSS features and can lead to verbose code.

// !  Building design systems in React

// * Building a design system in React involves creating reusable components, consistent styles, and following design principles to ensure maintainability and scalability across your project.

// ! Performance considerations for CSS in React
// * Here are some performance considerations for handling CSS in React:

// Minimize Inline Styles
//* Issue: Inline styles are recomputed on every render, which can hurt performance in large applications.

//* Solution: Use CSS classes or CSS-in-JS solutions (like styled-components or Emotion) to avoid inline styles wherever possible, as this allows the browser to cache styles better.

// Avoid Overuse of CSS-in-JS
//* Issue:

// * CSS-in-JS libraries like styled-components and Emotion generate dynamic styles at runtime, which incurs performance overhead.

//* Solution:

//* Static Styles: Move as much of the styling as possible to static styles, such as global stylesheets or precompiled CSS files. Only use dynamic CSS for things that truly need it.

//* Use Server-Side Rendering (SSR): Libraries like styled-components support SSR, which helps pre-generate the styles on the server, reducing the load on the client.

//* Babel Plugin: Use Babel plugins like babel-plugin-styled-components to enable server-side generation of styles, minification, and better runtime performance.

// Tree-Shaking Unused CSS
//* Issue: Large CSS frameworks or libraries (like Bootstrap or Material-UI) can bloat your app if not properly optimized, including unused styles.

//* Solution:

//* PurgeCSS: Use tools like PurgeCSS to remove unused CSS in production, especially when using utility-based CSS frameworks.
//* Modular CSS Imports: Only import the CSS for the components you're using rather than the entire framework.

// !What is Tailwind CSS?
//* Tailwind is a utility-first CSS framework where you build UIs by composing small, reusable CSS classes (utilities) directly in your markup. It’s very different from traditional CSS frameworks like Bootstrap, which use components and custom classes.

//  Benefits of Tailwind CSS in React
//* Fast Development: Tailwind allows you to quickly style components without writing custom CSS files.

//* Consistency: Using predefined classes ensures consistency across your UI.

//* Responsive Design: Tailwind includes a powerful responsive design system built-in with classes like md:text-lg or sm:hidden.

//* Customization: You can extend Tailwind and modify the default theme via a configuration file, enabling custom colors, spacing, typography, etc.

//!  TypeScript in React

// * TypeScript is commonly used in React to add type safety and improve code readability and maintainability. By leveraging TypeScript, you can define explicit types for your components, props, state, and function parameters.

// ! Typing props in functional components

// * Typing props in functional components in React with TypeScript can be done by creating an interface or type definition that describes the shape of the props. You then pass that type to the component function as a type parameter

// ! Strict typing for event handlers

// * Strict typing for event handlers in TypeScript ensures that event objects passed to the handler functions are properly typed, reducing the likelihood of errors and enhancing type safety.

//Example

// const handleEvent = (event: React.EventType<HTMLType>) => {
//   // Event handling logic
// };

// !  React Ecosystem Tools
// ** The React ecosystem is rich with tools and libraries that extend React’s capabilities, whether you’re managing state, routing, fetching data, handling forms, styling components, or testing your application. Choosing the right tool depends on your project’s needs, scale, and complexity.

//!1. State Management Tools

// State management is crucial in managing data across components in a React application.

//* Redux: A predictable state container that uses a strict unidirectional data flow. It’s one of the most popular state management tools in the React ecosystem.

// Tools: redux, @reduxjs/toolkit, react-redux
// Use when: You need global state management with a centralized store.

//* Zustand: A small, fast, and scalable state-management tool. It’s easier to set up than Redux and is gaining popularity for its simplicity.

// Use when: You need a minimalistic and flexible state management solution.

//* MobX: A library that enables reactivity in your state through observable values. It’s ideal for building more dynamic and complex UIs.

// Tools: mobx, mobx-react
// Use when: You need a more implicit and reactive state management approach.

//* Recoil: A state management library designed for performance and scalability, with a more React-like API. It's maintained by Facebook.

// Use when: You need fine-grained reactivity and better handling of async state.

//* Context API: Built into React, the Context API is useful for managing global state in small to medium-sized applications. It works well without needing a third-party library.

// !2. Routing Tools

// Routing tools allow for navigating between different views or pages in a React app.

// *React Router: The most popular routing library in the React ecosystem, providing a powerful solution for handling dynamic routing, route nesting, URL parameters, and more.

// Tools: react-router, react-router-dom, react-router-native
// Use when: You need client-side routing with full control over routes, parameters, and navigation.

//* Next.js: A React framework that includes server-side rendering, routing, and API routes out of the box. It’s ideal for building full-stack React applications with SEO optimizations.

// Use when: You need server-side rendering (SSR) or static-site generation (SSG) and powerful routing.

// ! 3. Data Fetching and API Interaction
// For managing API requests, data fetching, caching, and synchronization, React has several popular libraries.

//* Axios: A promise-based HTTP client for making API requests.

// Tools: axios
// Use when: You need a simple HTTP client to interact with REST APIs.

//* React Query: A powerful data-fetching library that handles caching, synchronization, and server-state management.

// Tools: react-query
// Use when: You need advanced data fetching, caching, pagination, and syncing server state with the UI.

//* SWR: A lightweight data-fetching library by Vercel that simplifies caching and revalidation of API requests.

// Tools: swr
// Use when: You need to handle simple or optimized data fetching with caching and revalidation.

//* Apollo Client: A comprehensive GraphQL client for managing data with queries and mutations.

// Tools: @apollo/client
// Use when: You are working with GraphQL APIs and need to handle complex data-fetching logic.

//! 4. Forms and Validation
// Forms are an essential part of most applications. Libraries that help manage forms, validation, and user input include:

//* Formik: A popular form management library that simplifies form state management and validation.

// Tools: formik
// Use when: You need to manage form state and validation in large or complex forms.
// React Hook Form: A fast and lightweight library for form handling that takes advantage of React’s hooks.

// Tools: react-hook-form
// Use when: You want an easy-to-use form library with minimal re-rendering and great performance.

//* Yup: A JavaScript object schema validator that is commonly used with Formik or React Hook Form to handle form validation.

// Tools: yup
// Use when: You need a schema-based form validation library to work alongside form libraries like Formik or React Hook Form.

//! 5. Styling Libraries
// Managing styles in React applications can be handled in various ways, from traditional CSS to more modern solutions like CSS-in-JS.

//* Styled Components: A popular CSS-in-JS library that allows you to style components using tagged template literals.

// Tools: styled-components
// Use when: You want to write CSS-in-JS with a focus on scoped styles and theming.

//* Emotion: A library for writing CSS styles with support for CSS-in-JS and styled components.

// Tools: @emotion/react, @emotion/styled
// Use when: You need CSS-in-JS with great performance and flexibility.

//* Tailwind CSS: A utility-first CSS framework that provides low-level utility classes to build custom designs.

// Tools: tailwindcss
// Use when: You prefer writing styles using utility classes without the need for writing custom CSS.

//* CSS Modules: A CSS file where all class and animation names are scoped locally by default.

// Tools: css-modules
// Use when: You want to scope your CSS styles to specific components without the complexity of a CSS-in-JS solution.

//! 6. Testing Libraries
// Testing tools ensure that React components and applications are reliable and bug-free.

//* Jest: A popular testing framework maintained by Facebook, used for unit and integration testing in JavaScript/TypeScript applications.

// Tools: jest
// Use when: You need a testing framework that supports snapshot testing, mocking, and coverage reports.

//* React Testing Library: A testing library for React components that focuses on testing the component’s behavior rather than implementation details.

// Tools: @testing-library/react
// Use when: You need to test React components by interacting with the UI and mimicking user behavior.

//* Cypress: A powerful end-to-end testing framework that runs tests directly in the browser.

// Tools: cypress
// Use when: You need end-to-end testing for simulating user interactions with your app in a real browser environment.

//! 7. Static Site Generators (SSG) and Frameworks
// These tools help generate static HTML content based on React components, improving performance and SEO.

//* Next.js: Provides static-site generation (SSG), server-side rendering (SSR), and API routing all in one framework. It is optimized for building high-performance React apps.

// Use when: You need both static and dynamic page generation, and want built-in routing and SSR support.

//* Gatsby: A React-based framework for building static sites with powerful integrations like GraphQL.

// Tools: gatsby
// Use when: You are building static websites and need excellent performance with plugin support.

//! 8. Build Tools and Optimization
// Build tools help optimize, bundle, and manage assets for React applications.

// Webpack: A module bundler for JavaScript applications. It is highly configurable and used in many React projects.

// Tools: webpack
// Use when: You need full control over your asset pipeline and want to configure things like code splitting and bundling.

//* Vite: A next-generation, fast build tool that is much quicker than Webpack for development and production builds.

// Tools: vite
// Use when: You want a faster development experience with better support for modern JavaScript features.
// Parcel: A zero-config bundler that works out of the box without the need for much configuration.

// Tools: parcel
// Use when: You need a simple and quick solution for bundling your application without complex configuration.

//! 9. Static Typing with TypeScript
// React applications benefit significantly from TypeScript, providing type safety, auto-completion, and catching bugs during development.

//* TypeScript: A statically typed superset of JavaScript that brings types to React, ensuring type safety and reducing runtime errors.
// Tools: typescript, @types/react
// Use when: You need static typing and better tooling to prevent runtime bugs and improve the developer experience.
