//! 🔹 1. Project & Codebase Architecture

// Monorepo vs. Polyrepo – when to use tools like Nx or Turborepo.

// Modular Architecture – splitting code into feature-based modules instead of giant folders (e.g., features/, shared/, components/, services/).

// Micro-Frontends – splitting large apps into independently deployable pieces (Module Federation, single-spa, etc.).

// Separation of Concerns – clear distinction between UI (components), state management, services (API calls), and utilities.

// 👉 Expect to answer: “How would you structure a frontend codebase for a large team?”

// **  I’d use a feature-based modular structure, where each feature (like Payments or Users) has its own components, hooks, services, and store. Shared logic and reusable UI go into a /shared folder with Storybook documentation.

//* For state management, I’d separate client state and server state — for example, using Zustand/Redux for feature state and React Query for server data. APIs would be abstracted into a service layer, so the UI never directly talks to backend endpoints.

//* To ensure code quality in a large team, I’d enforce linting, unit/integration tests, and CI/CD pipelines, with feature flags for progressive delivery. Finally, I’d document conventions and onboarding steps to keep the team aligned.

// src/
//  ├── features/
//  │    ├── payments/
//  │    │     ├── components/
//  │    │     ├── hooks/
//  │    │     ├── services/
//  │    │     ├── store/
//  │    │     └── index.ts
//  │    ├── users/
//  │    ├── dashboard/
//  │    └── ...
//  ├── shared/
//  │    ├── components/   # Reusable UI (buttons, modals, inputs)
//  │    ├── hooks/        # Reusable logic (useAuth, useDebounce)
//  │    ├── utils/        # Helper functions
//  │    └── types/        # Global TypeScript types
//  ├── styles/
//  ├── pages/             # (Next.js routing or app entry points)
//  └── app.tsx

// ####################################

//! 🔹 2. State Management & Data Flow

// Client State vs. Server State → when to use React Context/Zustand/Redux vs React Query/SWR.

// Normalized Data Structures – to avoid deeply nested state.

// Event-driven Architecture – e.g., pub/sub patterns for decoupled components.

// Scalability – handling complex data flows (e.g., dashboards, real-time apps).

// 👉 Expect: “Why would you choose Zustand over Redux?” or “How do you prevent prop-drilling in large apps?”

// * “Redux is powerful, especially for large apps that need predictable state management, middleware, and a strict unidirectional data flow. But it comes with boilerplate — actions, reducers, types — which can slow teams down.

//* Zustand, on the other hand, is lightweight, minimal boilerplate, and has a very simple API. For apps where you don’t need complex middleware or time-travel debugging, Zustand is faster to implement and easier for new team members to learn. It also allows colocating state logic closer to features, making the codebase more modular.

//* That said, if I expect very large teams or highly complex global state, I might still prefer Redux Toolkit because of its ecosystem and structure. But for many cases, Zustand gives you 80% of Redux’s power with 20% of the overhead.”

// ! ✅ “I choose Redux if I need predictability and middleware at scale, Zustand for lightweight state, and Context for small global concerns. It depends on the team and project.”

// ** Q2: How do you prevent prop-drilling in large apps?

// *Prop-drilling happens when data has to be passed down through multiple component layers unnecessarily. In large apps, this quickly makes components harder to maintain.

// To avoid it, I typically use:

//* Context API for global UI state (like theme, auth, language).

//* State libraries like Zustand or Redux for business/domain state shared across multiple features.

//* React Query (or SWR) for server state, so components subscribe directly to cached API data.

//* The goal is to keep components as pure and reusable as possible, and centralize shared state where it makes sense.”

// ####################################

//! 🔹 3. Performance & Optimization Architecture

// Code Splitting / Lazy Loading – dynamic imports in React/Next.js.

// Caching Strategies – browser caching, service workers, React Query caching.

// Rendering Models – CSR (Client-Side Rendering), SSR (Server-Side Rendering), SSG (Static Site Generation), ISR (Incremental Static Regeneration).

// CDN usage and edge rendering for global scale.

// 👉 Expect: “How would you architect a frontend to handle millions of users with minimal load time?”

// ####################################

//! 🔹 4. API Layer & Integration

// API abstraction layer – separating data-fetching logic from UI.
// * The way I design the API layer is to decouple the frontend from backend changes by introducing an abstraction layer and using defensive patterns. The goal is that even if the backend changes fields, versions, or contracts, the frontend won’t immediately break.”

// * “In practice, I’d put all API calls behind a service layer with response mappers. That way, the UI only deals with stable, normalized objects. We version our endpoints and use TypeScript plus contract tests to catch breaking changes early. And even if the backend removes or renames fields, the frontend degrades gracefully instead of crashing. This keeps the UI resilient and reduces cross-team friction.”

// * “If the app is very dynamic, I might prefer GraphQL because the frontend controls what fields it gets, reducing the risk of backend changes breaking the UI. But for simpler apps, REST with a well-structured service layer is enough.”

// Example abstraction

// const backendResponse = {
//   id: "u123",
//   first_name: "Mubarak",
//   last_name: "Muhammed",
//   phone_number: "08012345678",
//   email_address: "mubarak@example.com",
// };

export const mapUserResponse = (data) => {
  return {
    id: data.id,
    fullName: `${data.first_name ?? data.firstName} ${
      data.last_name ?? data.lastName
    }`,
    phone: data.phone_number ?? data.phone,
    email: data.email_address ?? data.email,
  };
};

export const getUserProfile = async (id) => {
  const response = await api.get(`/users/${id}`);
  return mapUserResponse(response.data); // mapping function the UI consumes this
};

//! GraphQL vs REST – trade-offs and when to use each.

// 🔹 When I’d Choose Each

//* GraphQL is better when:

// Complex UIs need data from multiple entities at once (e.g., dashboard pulling user, transactions, notifications).

// Multiple clients (web, iOS, Android) consume the same API but need different slices.

// You want a single schema contract between frontend & backend.

//* REST is better when:

// Simple resource-oriented API (e.g., CRUD services).

// Heavy use of CDN + HTTP caching for performance.

// Small teams or projects → less tooling/setup overhead.

// Compliance-driven environments where predictability is critical (e.g., banking audit logs).

//!! Error Handling & Retry Policies – resilience patterns in API consumption.

// 🔹 Key Patterns

//* 1. Graceful Error Handling

// User-friendly messages (not raw errors):

// “Something went wrong, please try again.”

// Fallback UIs: skeleton loaders, cached data, or default placeholders.

// Silent failures for background requests (e.g., analytics) so users aren’t interrupted.

//* 2. Retry Policies

// Exponential Backoff:

// Retry after 1s → 2s → 4s → 8s (instead of hammering the API).

// Max Retry Count: stop after N retries to avoid infinite loops.

// Jitter: add randomness to avoid all clients retrying at the same time (thundering herd).

async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, delay));
      return fetchWithRetry(url, options, retries - 1, delay * 2); // backoff
    }
    throw err;
  }
}

// *3. Fail-Fast & Circuit Breakers

// If a service is consistently failing, stop retrying temporarily (circuit breaker pattern).

// Avoids flooding backend with doomed requests.

// Show cached data or fallback view until service recovers.

//* 4. Caching & SWR (Stale-While-Revalidate)

// Serve cached/stale data if API fails.

// Attempt background refresh later.

// Example: React Query’s staleTime + retry config.

//* 5. Monitoring & Logging

// Log errors to Sentry/Datadog.

// Track retry counts + failure rates.

// If errors spike, trigger alerts → backend team.

// 🔹 How to Say It in an Interview

// “I design API consumption with resilience: user-friendly error messages, retries with exponential backoff and jitter, and circuit breakers to avoid overwhelming backends. If a request fails, I prefer showing cached data with a background refresh (stale-while-revalidate) instead of breaking the UI. Combined with logging and monitoring, this ensures the app degrades gracefully instead of failing hard.”

// * When consuming APIs in the frontend, I design with resilience in mind. That means handling failures gracefully and retrying intelligently so the user experience isn’t broken by temporary issues.

// ####################################

//! 🔹 5. Security Architecture

//* Authentication & Authorization – JWT, OAuth2, role-based access.
// “I separate authentication (proving identity) from authorization (what a user is allowed to do). In the frontend, I typically work with standards like JWT for stateless sessions, OAuth2/OIDC for delegated login, and role-based access control (RBAC) for feature gating. The frontend enforces UI restrictions, but the backend is always the source of truth for security.”

//* XSS & CSRF Protections – sanitization, same-site cookies, secure headers.

// I protect against XSS by sanitizing and escaping untrusted input, enforcing strict Content Security Policies (CSP), and avoiding unsafe DOM APIs. For CSRF, I use SameSite HttpOnly cookies, CSRF tokens, and secure headers. The goal is defense-in-depth: even if one layer fails, others protect the system.

// CSRF (Cross-Site Request Forgery): Attacker tricks a logged-in user’s browser into sending a request (like transferring money) using their cookies.

// For XSS, I rely on React’s built-in escaping, but when rendering user-generated HTML, I sanitize it with DOMPurify. I also enforce a CSP that only allows scripts from trusted domains. For CSRF, I configure cookies as HttpOnly, Secure, and SameSite, and combine that with CSRF tokens for state-changing requests. This layered approach ensures that even if one mechanism fails, others protect the app.

//* Secrets Management – environment variables, not exposing tokens.

// 👉 Expect: “How do you secure sensitive data in a React app?”

// ####################################

// !🔹 6. Testing & Quality Architecture

// Unit, Integration, and E2E Testing – Jest, React Testing Library, Cypress, Playwright.

// Storybook / Visual Regression – for UI consistency.

// CI/CD Pipelines – automated tests on PRs, linting, type-checking.

// 👉 Expect: “How would you ensure code quality in a large frontend team?”

// ####################################

//! 🔹 7. Deployment & Scalability Architecture

// CI/CD Setup – GitHub Actions, GitLab CI, CircleCI.

// Feature Flags / A/B Testing – LaunchDarkly, Split.io.

// Progressive Delivery – Canary deployments, blue-green deployments.

// Monitoring & Observability – logging errors (Sentry), performance monitoring (New Relic, Datadog).

// 👉 Expect: “How would you release new features to 1% of users first?”

// ####################################

// !🔹 8. Cross-Functional & Collaboration Architecture

//* How to set coding standards across teams.

// I’d start by defining coding standards and automating them with ESLint, Prettier, and CI checks. To keep the UI consistent, I’d introduce a shared component library documented in Storybook, so multiple teams don’t reinvent buttons or modals differently.

// For alignment, I’d make sure decisions are documented in ADRs and that onboarding guides are up-to-date, so new engineers can get productive quickly. And to sustain alignment, I’d set up a frontend guild where representatives from each team review patterns, propose improvements, and ensure consistency without slowing innovation.

// This way, teams can ship independently but the product feels cohesive and maintainable.

//* Component Libraries & Design Systems – building scalable UI systems (Storybook, Radix, shadcn/ui).

//* Documentation & Onboarding – architecture diagrams, ADRs (Architecture Decision Records).

// 👉 Expect: “How would you align multiple frontend teams working on the same app?”

// ####################################

// !🔹 9. Communication & Stakeholder Management

// How to communicate technical trade-offs to non-technical stakeholders.

// How to translate complex issues into simple terms for business leaders.

// 👉 Expect: “How do you explain technical decisions to non-technical stakeholders?”

// ####################################

// !🔹 10. Leadership & Mentorship

// How to mentor junior developers.

// How to handle disagreements with teammates or product managers.
