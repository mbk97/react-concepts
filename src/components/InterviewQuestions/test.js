// ! What is Cross-site Scripting (XSS) and How would you protect against Cross-Site Scripting (XSS) in a React application
// * Cross-Site Scripting (XSS) is a vulnerability where attackers inject malicious scripts into web pages viewed by other users. In React, XSS can occur primarily through improper handling of user inputs or insecurely rendering HTML content.

// ! How would you protect against Cross-Site Scripting (XSS) in a React application
// * XSS can be mitigated by sanitizing user inputs and avoiding dangerouslySetInnerHTML. Libraries like DOMPurify can help sanitize any HTML inputs. Using Content Security Policy (CSP) headers at the server level can also block unauthorized scripts.

// ! useRef for DOM and instance variable

// The useRef hook in React serves two main purposes:

// Accessing DOM elements.

// Maintaining mutable instance variables (values that persist across renders without causing a re-render).

// ** When you need to directly interact with a DOM element (like focusing an input or controlling a video element), useRef allows you to obtain a reference to that element.

// ! Error boundaries

// ** Error Boundaries in React are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application. Error boundaries catch errors during rendering, in lifecycle methods, and in constructor methods of the whole tree below them.

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

// ! How would you optimize performance in a large React app?
// * (Expect mention of React.memo, useMemo, useCallback, code-splitting, lazy loading.)

// ! Suspense
//* Suspense is a component that lets you specify a fallback UI (e.g., a loading spinner) to display while a child component is loading.

//! Controlled Component

//** In a controlled component, form data is handled by the component's state. The value of the form element is set explicitly via state, and every change triggers an event that updates the state.

//** The component fully controls the input and its value through props or state, making the form element always synced with the component's state.

// 🌱 Fundamentals

//! What is Role-Based Access Control (RBAC)? How is it different from simple authentication?
// → Tests if they understand auth vs. authZ.

// !Can you explain the difference between roles, permissions, and users in RBAC?
// (User → assigned a Role → which has Permissions.)

// !In a web app, where would you enforce RBAC: backend, frontend, or both? Why?
// → Good answer: backend is the source of truth; frontend only hides/show UI for UX.

// ! 🔑 Difference Between AuthN vs AuthZ

// Authentication (AuthN) → “Who are you?”
// Verifies identity (login with email/password, OAuth, SSO, etc.).

// Authorization (AuthZ) → “What are you allowed to do?”
// Decides access rights (can this user view orders, delete products, access /admin?).

// ! Debouncing ensures that a function is only executed after a specified delay has passed since the last time it was invoked. If the function is called again before the delay ends, the timer resets. This way, you can avoid executing the function too frequently.

// ! Infinite Scrolling
// * Infinite scrolling is a technique used to load data as the user scrolls down a page, improving performance by loading data in chunks.

//! Lifting state up

//** Lifting state up in React refers to the pattern of moving state from one or more child components to their common parent, so the parent can manage the state and pass it down as props to those children. This is commonly used when multiple components need to share and synchronize state.

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

//! 2. Reconcilation Algorithm

// ** The reconciliation algorithm in React is the process of updating the UI efficiently when the component’s state or props change. React compares the current virtual DOM with the previous one and determines the minimum number of changes necessary to update the actual DOM.

//! Server-Side Rendering (SSR):
/*
The server builds the full HTML for every request 
and sends it to the browser.

Best for pages that always need fresh data
and good SEO — e.g., product pages, blogs, and search results.
*/

//! Client-Side Rendering (CSR):
/*
The server sends a blank HTML page + JavaScript.
The browser runs the JavaScript and renders the UI.

Best for interactive apps, dashboards, and authenticated pages 
where SEO is not a priority.
*/

//! Static Site Generation (SSG):
/*
The HTML is generated once at build time and reused for all users.
No server work on each request.

Best for pages that rarely change — e.g., documentation,
marketing pages, blogs with stable content.
*/

//! Incremental Static Regeneration (ISR):
/*
The page is pre-rendered like SSG, 
but Next.js can automatically re-generate it in the background 
after a set time.

Best for large content sites where SEO matters 
but data changes occasionally — e.g., news, listings, product catalogs.
*/

//! ✅ Event Delegation (Simple Explanation)

// Event Delegation is a technique where instead of adding event listeners to many child elements,
// you add one event listener to their parent element and detect which child triggered the event.

// without

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => console.log("Button clicked"));
});

// With
document.querySelector("#parent").addEventListener("click", (e) => {
  if (e.target.matches(".btn")) {
    console.log("Button clicked");
  }
});
