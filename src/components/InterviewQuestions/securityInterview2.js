//! Http vs Https

// * Hypertext transfer protocol secure (HTTPS) is the secure version of HTTP, which is the primary protocol used to send data between a web browser and a website. HTTPS is encrypted in order to increase security of data transfer. This is particularly important when users transmit sensitive data, such as by logging into a bank account, email service, or health insurance provider.

// HTTP (Hypertext Transfer Protocol)
//* Unsecured Communication: HTTP sends data in plain text, meaning all information exchanged between the browser and server is unencrypted. This makes it vulnerable to interception and tampering by attackers (man-in-the-middle attacks).

//* No Data Privacy: With HTTP, sensitive information, like passwords, session tokens, or payment data, can be intercepted by anyone monitoring the network.

//* Poor User Trust: Modern browsers mark HTTP sites as "Not Secure," which can reduce user trust and discourage users from interacting with the app.

// HTTPS (HTTP Secure)

//* Encrypted Communication: HTTPS uses SSL/TLS encryption to protect the data exchanged between the client and server, preventing eavesdropping and interception by third parties.

//* Improved Data Integrity: Encrypted connections ensure that the data sent to and from the server remains unchanged in transit.

//* User Trust and Browser Warnings: Most browsers now display a padlock icon for HTTPS sites and alert users if they visit an HTTP site, enhancing user trust for HTTPS.

//* SEO Benefits: Search engines like Google give preference to HTTPS sites over HTTP, making HTTPS beneficial for SEO rankings.

//* Required for Progressive Web Apps (PWAs): To enable service workers and use many advanced features in PWAs, HTTPS is required.

// Setting Up HTTPS for a React App

// To make a React app accessible over HTTPS, you need an SSL certificate for your domain. Here’s how you can set it up:

// Use HTTPS in Development:

//* Create React App (react-scripts) allows running the development server over HTTPS. You can start the dev server with HTTPS enabled by running:

// HTTPS=true npm start
// This is useful for testing secure features locally.

//* Configure HTTPS in Production:

//* If deploying with a service like Vercel, Netlify, or Firebase Hosting, HTTPS is typically enabled automatically.

//* If deploying on your server, you’ll need an SSL certificate. Free certificates are available through services like Let’s Encrypt. Once obtained, configure your server (e.g., Nginx, Apache) to use HTTPS.

// ! How would you secure API calls made from a React application

// 1. Use HTTPS

// * Ensure all API calls are made over HTTPS instead of HTTP. This encrypts data in transit, preventing man-in-the-middle attacks where an attacker might intercept or modify requests and responses.

// axios.get('https://api.example.com/data')  // Always use HTTPS

// 2. Use Authentication & Authorization
// *JWT (JSON Web Token): Use tokens for authenticating API requests. Tokens are usually sent as Authorization: Bearer <token> headers.

axios.get("https://api.example.com/data", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

// 3. Secure API Keys
// * Environment Variables: Never hardcode API keys directly in the client code. Instead, use environment variables to store sensitive information securely. For client-side apps, ensure API keys are only sent to your server, not directly to the frontend.

REACT_APP_API_URL = "https://api.example.com";
REACT_APP_API_KEY = your_api_key;

// 4. CORS (Cross-Origin Resource Sharing)
// * Ensure that your backend has proper CORS policies in place to allow only requests from trusted origins. This prevents other websites from making unauthorized requests to your API on behalf of your users.

// configure cors in backend

app.use(
  cors({
    origin: "http://localhost:3000", // Allow only your React app to make requests
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 5. Sanitize Inputs

//* Always sanitize user inputs to avoid injection attacks like SQL injection or XSS (Cross-Site Scripting). On the server, validate and sanitize all incoming data before processing it.

//6. Regularly Update Dependencies
//* Keep all your dependencies, including React, Axios, and other libraries, up to date to avoid vulnerabilities in outdated packages. Use tools like npm audit to check for vulnerabilities in your dependencies.

// ! How do you handle authorization in a React app

//* Implement authentication and store user roles or permissions after login.

//* Use protected routes to restrict access based on user roles.

//* Manage auth state (user data and roles) with React Context, Redux, or Zustand.

//* Use conditional rendering for components or features specific to roles.

//* Ensure server-side authorization for all API requests to prevent unauthorized access.

//* Redirect unauthorized users to an error page and provide clear messages.
