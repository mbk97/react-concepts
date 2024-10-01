// !  Server-Side Rendering (SSR)

// ** Server-Side Rendering (SSR) is a technique used in web development where HTML pages are rendered on the server and sent to the client, rather than having the client render the page dynamically via JavaScript. SSR has several benefits, including improved performance, better SEO, and faster first-page load times

//* How SSR Works:

//*  Request:
// A user’s browser sends a request to the server for a specific URL.

//* Server:
// The server processes the request, fetches necessary data, and renders the HTML for the requested page.

//* Response:
// The server sends the fully rendered HTML back to the browser.

//* Hydration:
// After the HTML is delivered, JavaScript takes over to make the page interactive (e.g., attach event listeners, load additional data).

// ! Hydration in Server-Side Rendering (SSR) applications refers to the process where a web application, after receiving and rendering the static HTML from the server, runs JavaScript on the client side to make the page interactive.

// ! Static-site generation (SSG) with React

// **  Static-Site Generation (SSG) with React is a method of pre-rendering pages at build time, which results in faster page loads and better SEO without the overhead of dynamic content rendering on each request. In SSG, HTML pages are generated once during the build process, and these pre-rendered static files are served directly to users. This is in contrast to Server-Side Rendering (SSR), where pages are generated on each request.

// ! Concurrent Mode in React is an experimental set of new features designed to help React apps stay responsive and gracefully adjust to the user's device capabilities and network speed. It enables React to interrupt and pause rendering to prioritize higher-priority updates, providing a smoother user experience.

//! Routing

//* routing refers to the process of handling navigation within your application without the need to reload the page. React Router is the most commonly used library for managing routing in React applications. It allows you to define routes, handle navigation between different views, and manage parameters passed through URLs.

// ! React Router v6 (advanced patterns)

// * Outlet Context:
// React Router v6 introduces a feature called Outlet context, which allows you to pass data from a parent route to its children without prop-drilling.

function Dashboard() {
  const user = { name: "John" };

  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet context={user} />
    </div>
  );
}

function Profile() {
  const user = useOutletContext(); // Access the user context here
  return <h1>Welcome, {user.name}</h1>;
}

// * Protected Route

// You can easily create protected routes in React Router v6 by wrapping them inside a component that checks authentication.

function ProtectedRoute({ element: Component, ...rest }) {
  const isAuthenticated = useAuth(); // your auth logic

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
}

<Routes>
  <Route
    path="/dashboard"
    element={<ProtectedRoute element={<Dashboard />} />}
  />
</Routes>;

// * Layout with Outlet

// For more complex routing layouts (e.g., dashboards or admin panels), you can use the Outlet component to render child routes inside a parent layout.

function DashboardLayout() {
  return (
    <div>
      <NavBar />
      <Outlet /> {/* This renders the nested route component */}
    </div>
  );
}

<Routes>
  <Route path="dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
    <Route path="profile" element={<Profile />} />
  </Route>
</Routes>;

// ! Route protection (authentication/authorization)

// *  Route Protection Based on Roles (Authorization):

// Authorization goes a step beyond authentication by checking if the user has the right permissions or roles to access a route. For instance, admins may have access to certain routes that regular users

import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ element: Component, requiredRole }) {
  const { loggedIn, role } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page
  }

  return Component;
}

// Use the RoleProtectedRoute to protect specific routes based on roles.

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={<RoleProtectedRoute element={<Dashboard />} />}
      />
      <Route
        path="/admin"
        element={
          <RoleProtectedRoute element={<AdminPanel />} requiredRole="admin" />
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

// ! Using useLocation for Redirect to Login

//* If users try to access a protected route while not authenticated, React Router can remember where they were trying to go and redirect them back to that page after logging in.

function ProtectedRoute({ element: Component }) {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    Component
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

// ! Dynamic Routing

//* Dynamic routing in React Router allows you to create routes that can accept parameters, making it easier to build applications where the content can change based on user input or other dynamic data.

<Routes>
  <Route path="/users/:userId" element={<UserProfile />} />
</Routes>;

// ** Accessing the parameter
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {userId}</p>
      {/* Fetch user data based on userId */}
    </div>
  );
}

// ! Optional parameters
<Route path="/users/:userId/posts/:postId?" element={<UserPosts />} />;

// ! Scroll restoration in single-page applications

// * Scroll restoration in single-page applications (SPAs) is essential for maintaining a smooth user experience, especially when navigating between different views or routes. Here are some strategies and approaches to effectively manage scroll restoration in SPAs:

// Steps

// Save Scroll Position: When the user navigates away from a page, save the current scroll position using sessionStorage or a global state.
window.onbeforeunload = function () {
  sessionStorage.setItem("scrollPosition", window.scrollY);
};

// Restore Scroll Position: When the user returns to the page, retrieve the stored scroll position and scroll to that position.
window.onload = function () {
  const scrollPosition = sessionStorage.getItem("scrollPosition");
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition));
    sessionStorage.removeItem("scrollPosition");
  }
};

// ! Form Validation

//  * Method One
const MyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Submit the form
      console.log("Form data:", formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

// * Method Two

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const MyFormikForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Form data:", values);
      }}
    >
      <Form>
        <div>
          <label>Name:</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label>Email:</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="span" />
        </div>
        <div>
          <label>Password:</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="span" />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

// ! Controlled vs uncontrolled form input

// Comparison

// * Controlled Components

// ! Controlled components are those where the form data is controlled by React state. The value of the input is set through a state variable, and any changes to the input are handled by updating that state.

// Uses React state for managing input value
// Easier to validate and control
// Can submit data directly from state

// * UnControlled Components

// ! Uncontrolled components, on the other hand, manage their own state internally. Instead of using React state to manage the value of the input, you can use refs to access the current value when needed

// Uses refs to access input value
// 	Harder to validate as values are accessed via refs
// Needs to read values from refs on submit

// ! Debouncing ensures that a function is only executed after a specified delay has passed since the last time it was invoked. If the function is called again before the delay ends, the timer resets. This way, you can avoid executing the function too frequently.

import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;

const DebouncedInput = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500); // 500ms debounce delay

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Effect to run when the debounced value changes
  React.useEffect(() => {
    if (debouncedValue) {
      console.log("API Call with:", debouncedValue);
      // Place your API call or logic here
    }
  }, [debouncedValue]);

  return (
    <div>
      <label>
        Search:
        <input type="text" value={inputValue} onChange={handleChange} />
      </label>
    </div>
  );
};
