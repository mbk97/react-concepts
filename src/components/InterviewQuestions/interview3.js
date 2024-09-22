// ! State normalization (flat state structure)

// ** State normalization is a technique used to manage state in applications, especially when dealing with complex or deeply nested data. The goal is to flatten the state structure to make it easier to manage and access. This approach is often used in state management libraries like Redux or Zustand, and it helps improve performance and maintainability.

//** Key Concepts of State Normalization

// Flat State Structure: Instead of nesting data structures, the state is flattened into a more manageable format. For example, instead of storing a list of items directly within another item, you would store each item in a flat object and reference them by IDs.

// Entities and IDs: In a normalized state, entities (like users, posts, or products) are stored in a dictionary-like object where each entity is keyed by a unique ID. Relationships between entities are managed using these IDs.

// Selectors: To retrieve data from the normalized state, you use selectors. Selectors are functions that extract and shape the data as needed from the flat structure.

// * Example

{
  users: [
    {
      id: 1,
      name: "Alice",
      posts: [
        { id: 1, title: "Post 1", content: "Content 1" },
        { id: 2, title: "Post 2", content: "Content 2" },
      ],
    },
    {
      id: 2,
      name: "Bob",
      posts: [{ id: 3, title: "Post 3", content: "Content 3" }],
    },
  ];
}

// Normalized State
// {
//   users: {
//     1: { id: 1, name: 'Alice' },
//     2: { id: 2, name: 'Bob' }
//   },
//   posts: {
//     1: { id: 1, title: 'Post 1', content: 'Content 1', userId: 1 },
//     2: { id: 2, title: 'Post 2', content: 'Content 2', userId: 1 },
//     3: { id: 3, title: 'Post 3', content: 'Content 3', userId: 2 }
//   }
// }

// In this normalized state:
// Each user and post is stored in its own dictionary with its ID as the key.
// Relationships between users and posts are represented by IDs (userId in posts).

// ** To get posts by a specific user, you might use a selector:

const getPostsByUser = (state, userId) => {
  return Object.values(state.posts).filter((post) => post.userId === userId);
};

// Benefits
// Efficient Updates: Flattening data makes it easier to update specific items without affecting others.
// Simpler Data Access: Direct access to items by ID simplifies data retrieval.
// Reduced Redundancy: Avoids duplication of data and reduces the risk of inconsistencies.

//! State colocation (keeping state local where possible)

// **  State colocation is the practice of keeping state as close as possible to the component that needs it. This approach helps in managing state more effectively and ensures that components are easier to reason about and maintain. Here’s a breakdown of the concept:

// ** Key Concepts of State Colocation

// Local State: Keep state local to the component where it’s used, rather than lifting it up to a higher level or storing it globally. This reduces complexity and makes components more self-contained.

// Encapsulation: Encapsulating state within a component ensures that only that component and its direct children have access to it, preventing unintended side effects from other parts of the application.

// Component Independence: By colocating state, components are less dependent on each other and the global state, leading to better separation of concerns.

// Performance Optimization: Local state can improve performance by avoiding unnecessary re-renders of other components that don’t need to be aware of or affected by state changes.

// ** When to Use State Colocation

// Small, Self-Contained Components: For components that manage their own data and don’t need to share it with other parts of the application.

// Temporary State: For state that is transient and specific to the lifecycle of a component (e.g., form input values, toggles).

// UI State: For state related to UI elements that don’t affect other parts of the app (e.g., whether a dropdown is open or closed).

// ! Handling global state with Context API

//* Benefits

// Simplified Prop Management: Avoids prop drilling by providing state to components directly.
// Centralized State Management: Provides a way to manage global state in a centralized manner.
// Easy to Use: Integrates seamlessly with React's functional components and hooks.

//* Considerations

// Performance: Be mindful of performance implications. If the context value changes frequently, it can cause unnecessary re-renders. Consider using memoization techniques or breaking up context into smaller pieces if needed.

// Complexity: For more complex state management needs (e.g., handling asynchronous actions, middleware), you might want to consider using state management libraries like Redux or Zustand alongside the Context API.

// !  Reducers and how to structure them

//** Best Practices
// Keep Reducers Pure: They should not mutate the state or have side effects.

// Use Action Types as Constants: Avoid magic strings by defining action types as constants.

// Organize by Feature: Split reducers by features or domains to keep related logic together.

// Use Immutable Patterns: Return new state objects rather than modifying the existing state.

// !  Optimistic UI update

// ** Optimistic UI updates are a technique used to provide a smoother and more responsive user experience by assuming that an operation (like a data change) will succeed and updating the UI immediately. If the operation fails, you then handle the rollback or error state.

//** Basic Concept

// Update UI Immediately: When a user performs an action (e.g., submitting a form), update the UI to reflect the change as if the server request will succeed.

// Send Request: Make the actual server request.

// Handle Response: If the request succeeds, keep the UI as is. If it fails, revert the UI to its previous state and show an error message.

//Let’s assume you have a list of items, and you want to optimistically update the list when adding a new item.

function ItemList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  const handleAddItem = async () => {
    const optimisticItem = { id: Date.now(), name: newItem }; // Example optimistic item
    setItems([...items, optimisticItem]);
    setNewItem("");
    setAdding(true);
    setError(null);

    try {
      await axios.post("/api/items", { name: newItem });
      // If needed, update the item in the state with real server data
    } catch (err) {
      setError("Failed to add item");
      setItems(items.filter((item) => item.id !== optimisticItem.id)); // Rollback
    } finally {
      setAdding(false);
    }
  };

  //   Explanation

  // Optimistic Update: The handleAddItem function immediately updates the UI by adding the new item to the list, assuming the server request will succeed.

  // Request Handling: The axios.post request is made to add the item to the server.

  // Error Handling: If the request fails, the state is reverted to remove the optimistic item, and an error message is displayed.

  return (
    <div>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        disabled={adding}
      />
      <button onClick={handleAddItem} disabled={adding}>
        {adding ? "Adding..." : "Add Item"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// In some cases, you might want to synchronize the state with the server response:

// Update State on Success

const handleAddItem = async () => {
  const optimisticItem = { id: Date.now(), name: newItem }; // Optimistic item
  setItems([...items, optimisticItem]);
  setNewItem("");
  setAdding(true);
  setError(null);

  try {
    const response = await axios.post("/api/items", { name: newItem });
    const { id } = response.data;
    setItems(
      items.map((item) =>
        item.id === optimisticItem.id ? { ...item, id } : item,
      ),
    );
  } catch (err) {
    setError("Failed to add item");
    setItems(items.filter((item) => item.id !== optimisticItem.id)); // Rollback
  } finally {
    setAdding(false);
  }
};

// !State synchronization across browser tabs

// For simple state synchronization, localStorage with the storage event is easy and sufficient for many use cases.
// For real-time state updates, consider using the Broadcast Channel API.
// For complex scenarios involving background sync or offline use, service workers may be more suitable.

// ! Handling asynchronous state updates

//** Handling asynchronous state updates in React can be crucial for ensuring that your application responds correctly to user interactions and API responses

// ! Managing stale state

//** Managing stale state in React involves ensuring that your components always have the most up-to-date data and avoiding issues that arise when the state reflects outdated information

// ** Guides

// Correctly set dependencies in useEffect to prevent stale state.
// Use cleanup functions to avoid updating state on unmounted components.
// Use functional updates in callbacks to reference the latest state.
// Consider using libraries like React Query for managing server state and data fetching.

// ! Performance Optimization

// ** Use useCallback and useMemo
// useCallback prevents re-creation of functions on each render, which is useful when passing callbacks to optimized components.

// useMemo memoizes expensive calculations to avoid re-calculating them on every render.

// ! Code splitting is a technique in React (and JavaScript applications in general) that allows you to break up your code into smaller chunks, which can be loaded on demand rather than being included in the initial bundle. This improves the application's performance by reducing the amount of JavaScript that needs to be downloaded, parsed, and executed at once.

//  ** The simplest way to implement code splitting in a React application is by using React.lazy() along with Suspense.

//! Performance optimization techniques

//** Use React.memo to prevent unnecessary re-renders of components
//** Use React.useCallback to prevent unnecessary re-creations of functions
//** Code Splitting
//** Optimize Asset Loading
//** Lazy Load Images and Components
//** Reduce Unnecessary Rendering with Keys
// * Avoid Anonymous Functions in JSX : Defining functions inline in JSX can lead to unnecessary re-renders. Move function definitions outside the render method or use useCallback.

// ! Defining functions inline in JSX can lead to unnecessary re-renders.
// * Defining functions inline in JSX can lead to unnecessary re-renders because a new function instance is created on each render. When you pass an inline function as a prop to a child component, that child component sees a new function reference every time the parent re-renders. This can trigger re-renders of the child component, even if its props haven't actually changed.

// ** By using useCallback, you ensure that the function reference remains stable, preventing unnecessary re-renders of child components and improving performance. This is particularly important in larger applications where re-rendering components can lead to performance bottlenecks.
