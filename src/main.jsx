import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // !React 18's strict mode double-invokes certain lifecycle methods in development mode to help identify side effects. If this is the case, you can disable strict mode in your React app to check if this is causing the issue. This is not recommended for production but useful for debugging.
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
);
