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
