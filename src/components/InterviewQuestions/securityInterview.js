// ! What are common security threats in web applications, and how can React help mitigate them
// ** Common threats include Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and SQL Injection.

// ! What is Cross-site Scripting (XSS)
// * Cross-Site Scripting (XSS) is a vulnerability where attackers inject malicious scripts into web pages viewed by other users. In React, XSS can occur primarily through improper handling of user inputs or insecurely rendering HTML content.

// ! How would you protect against Cross-Site Scripting (XSS) in a React application
// * XSS can be mitigated by sanitizing user inputs and avoiding dangerouslySetInnerHTML. Libraries like DOMPurify can help sanitize any HTML inputs. Using Content Security Policy (CSP) headers at the server level can also block unauthorized scripts.

// ! Explain dangerouslySetInnerHTML in React and when it's safe to use it.
// * dangerouslySetInnerHTML allows developers to inject HTML into a React component, but it can introduce XSS vulnerabilities if not handled carefully. It’s safe to use only when the HTML content is trusted and sanitized, such as static HTML that doesn’t contain user-generated content.

// ! What are some best practices for securely storing tokens or sensitive data in React
// * Avoid storing sensitive data in localStorage or sessionStorage because they are accessible via JavaScript, which exposes them to XSS attacks. Instead, use HttpOnly cookies for tokens or sensitive information, as they are not accessible to JavaScript.

// * Use a secure token storage solution like a library (react-secure-storage) that securely stores tokens in memory and never exposes
import SecureStorage from "react-secure-storage";

function App() {
  const [token, setToken] = useState(null);

  // Function to securely store the token
  const storeToken = (userToken) => {
    SecureStorage.setItem("authToken", userToken);
    setToken(userToken);
  };

  // Function to retrieve the stored token
  const getToken = () => {
    const storedToken = SecureStorage.getItem("authToken");
    setToken(storedToken);
  };

  // Function to clear the token
  const clearToken = () => {
    SecureStorage.removeItem("authToken");
    setToken(null);
  };

  useEffect(() => {
    // Retrieve the token when the component mounts
    getToken();
  }, []);

  return (
    <div>
      <h1>Secure Token Storage Example</h1>
      <div>
        {token ? (
          <div>
            <p>Token: {token}</p>
            <button onClick={clearToken}>Clear Token</button>
          </div>
        ) : (
          <button onClick={() => storeToken("your-secure-token-here")}>
            Store Token
          </button>
        )}
      </div>
    </div>
  );
}

// ! Content Security Policy (CSP)

// ** Content Security Policy (CSP) is a security feature that helps prevent various types of attacks, such as Cross-Site Scripting (XSS) and data injection attacks, by controlling the resources that a web application is allowed to load. In a React application, implementing CSP involves setting up rules in HTTP headers or meta tags to restrict where content can be loaded from, such as scripts, images, fonts, and styles.

// How CSP Works
// * CSP is implemented by defining a set of rules, known as "directives," that specify where different types of content can come from. For instance, you might only allow scripts from your own domain and trusted third-party sources like Google Analytics. When the browser detects content that violates these rules, it blocks the resource and can optionally report the violation.

// Some common CSP directives include

//* default-src: The default policy for loading resources like scripts, images, and styles.
//* script-src: Defines allowed sources for JavaScript.
//* style-src: Defines allowed sources for CSS stylesheets.
//* img-src: Defines allowed sources for images.
//* connect-src: Defines allowed sources for AJAX, WebSocket, and other connections.
//* frame-src: Defines allowed sources for embedding frames.

// Example
// * Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-scripts.com; style-src 'self' 'unsafe-inline'

//  ! CSRF
// * Cross-Site Request Forgery (CSRF) is a type of security vulnerability that happens In a React app when a malicious website tricks a user's browser into making unwanted requests to another site where the user is authenticated.

// How CSRF Works
// A CSRF attack happens when:

//* A user is authenticated on a website (Site A).
//* The user visits another, malicious site (Site B) while still logged in to Site A.
//* Site B sends a request to Site A using the user's cookies, taking advantage of the existing authentication session.

// * If the server at Site A doesn’t verify the request origin, it could mistakenly perform the action (e.g., making a transaction) as if the user themselves initiated it.

// Protecting Against CSRF in React

//* 1. Use CSRF Tokens

// * CSRF tokens are unique, secret tokens generated by the server and sent to the client. Each subsequent request from the client includes this token, allowing the server to verify that the request is legitimate.

//* CSRF tokens are typically stored in cookies or sent in the initial HTML response by the server and included in request headers for sensitive operations like form submissions.

// Back-end (Express Example with csurf Middleware)

const express = require("express");
const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

// Enable CSRF protection
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  // Send the CSRF token to the React app
  res.json({ csrfToken: req.csrfToken() });
});

// Other routes
app.post("/api/some-sensitive-route", csrfProtection, (req, res) => {
  // Protected route
  res.send("Action was successful");
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});

// Frontend example

import { useState, useEffect } from "react";
import axios from "axios";

function Appk() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    // Fetch the CSRF token when the app loads
    axios.get("/api/csrf-token").then((response) => {
      setCsrfToken(response.data.csrfToken);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post(
        "/api/some-sensitive-route",
        { data: "some data" },
        {
          headers: {
            "CSRF-Token": csrfToken, // Include the token in headers
          },
        }
      );
      alert("Request succeeded");
    } catch (error) {
      alert("Request failed");
    }
  };

  return (
    <div>
      <h1>CSRF Protection Example</h1>
      <button onClick={handleSubmit}>Send Protected Request</button>
    </div>
  );
}

export { Appk, App };
