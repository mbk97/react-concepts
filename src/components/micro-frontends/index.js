// ! Webpack

// * Webpack is a module bundler that takes modules with dependencies and generates static assets representing those modules.

// * Webpack is a module bundler for JavaScript applications.

//! Think of it as a tool that:

//* Takes all your code (JS, CSS, images, etc.),

//* Figures out how they depend on each other,

//* Bundles them together into optimized files for the browser.

//* Without Webpack (or other bundlers), your React app would have to ship tons of separate files, which is slow and messy.

//! 🔹 Why Do We Need Webpack?

// Browsers can only understand HTML, CSS, and JS — not JSX, TypeScript, or SCSS. Webpack helps by:

//* ✅ Compiling modern code → JSX → JavaScript (via Babel), TypeScript → JS.

//* ✅ Bundling dependencies → imports/exports become a single (or few) optimized files.

//* ✅ Optimizing assets → compress images, split chunks, remove unused code (tree-shaking).

//* ✅ Code splitting → load parts of your app only when needed (lazy loading).

//* ✅ Hot Module Replacement (HMR) → see code changes instantly without reloading.

// !🔹 Webpack in React

//* In most React projects, you don’t configure Webpack directly (e.g., CRA hides it).

//* But when building micro frontends with Module Federation, you usually need direct Webpack control.

// ######################### MICRO FRONTENDS #############################

// !🔹 What Are Micro Frontends

//* Micro frontends are to the frontend what microservices are to the backend.

//* Instead of building one big monolithic frontend app, you split it into smaller, independently developed, deployed, and maintained applications (micro-apps).

// Each micro-app:

//* Owns a business domain (e.g., payments, dashboard, profile, notifications).

//* Can be built and deployed independently.

//* Can use different stacks (though React + React is most common).

//* The shell (host) application ties everything together.

// 🔹 Why Use Micro Frontends?

//* ✅ Team autonomy – each team owns its app, can deploy without waiting for others.

//* ✅ Scalability – scale teams and codebases independently.

//* ✅ Tech flexibility – different parts can use different React versions, or even Angular/Vue if needed.

//* ✅ Independent deploys – deploy payments without touching the dashboard.

// 🔹 Challenges of Micro Frontends

//* ❌ Performance overhead – multiple apps → more bundles.

//* ❌ Shared dependencies – React might get duplicated unless handled.

//* ❌ Routing complexity – navigating between apps isn’t trivial.

//* ❌ Communication – micro-apps need a clean way to talk to each other.

//* ❌ DevOps overhead – independent deployments mean more pipelines to manage.

//! 🔹 Micro Frontends in React with Webpack Module Federation

// This is the most popular approach right now. 🔧 How It Works:

//* Webpack 5 introduced Module Federation.

//* Lets one app (host) dynamically load code from another app (remote).

//* Both apps can share dependencies (e.g., React, ReactDOM).

// Host (container app)

// webpack.config.js
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    products: "products@http://localhost:3001/remoteEntry.js",
  },
  shared: ["react", "react-dom"],
});

// App.js in host
import React from "react";

const ProductsApp = React.lazy(() => import("products/ProductsApp"));

function App() {
  return (
    <div>
      <h1>Host App</h1>
      <React.Suspense fallback="Loading Products...">
        <ProductsApp />
      </React.Suspense>
    </div>
  );
}

export default App;

// Remote (products micro-app)

// webpack.config.js
new ModuleFederationPlugin({
  name: "products",
  filename: "remoteEntry.js",
  exposes: {
    "./ProductsApp": "./src/App",
  },
  shared: ["react", "react-dom"],
});
