// import React, { useReducer } from "react";

import { useRef, useState, useEffect } from "react";

// const initialStateTwo = {
//   username: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
//   errors: {},
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "SET_FIELD_VALUE":
//       return {
//         ...state,
//         [action.field]: action.value,
//       };
//     case "SET_ERRORS":
//       return {
//         ...state,
//         errors: { ...state.errors, ...action.errors },
//       };
//     case "RESET_FORM":
//       return initialStateTwo;
//     default:
//       return state;
//   }
// }

// function SignupForm() {
//   const [state, dispatch] = useReducer(reducer, initialStateTwo);

//   console.log(state.errors);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     dispatch({ type: "SET_FIELD_VALUE", field: name, value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = {};
//     if (state.username == "") {
//       errors.username = "username is required";
//     }
//     // if (state.password !== state.confirmPassword) {
//     //   errors.confirmPassword = "Passwords do not match";
//     // }
//     if (state.password !== state.confirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//     }
//     if (Object.keys(errors).length > 0) {
//       dispatch({ type: "SET_ERRORS", errors });
//     } else {
//       // Proceed with the form submission
//       console.log("Form data:", state);
//       dispatch({ type: "RESET_FORM" });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6">
//       <div className="mb-5">
//         <input
//           className="border p-1"
//           type="text"
//           name="username"
//           value={state.username}
//           onChange={handleInputChange}
//           placeholder="Username"
//         />
//       </div>
//       {state.errors.username && <p>{state.errors.username}</p>}

//       <div className="mb-5">
//         <input
//           className="border p-1"
//           type="email"
//           name="email"
//           value={state.email}
//           onChange={handleInputChange}
//           placeholder="Email"
//         />
//       </div>
//       <div className="mb-5">
//         <input
//           className="border p-1"
//           type="password"
//           name="password"
//           value={state.password}
//           onChange={handleInputChange}
//           placeholder="Password"
//         />
//       </div>
//       <div className="mb-5">
//         <input
//           className="border p-1"
//           type="password"
//           name="confirmPassword"
//           value={state.confirmPassword}
//           onChange={handleInputChange}
//           placeholder="Confirm Password"
//         />
//       </div>
//       {state.errors.confirmPassword && <p>{state.errors.confirmPassword}</p>}
//       <button type="submit" className="button bg-cyan-200 p-2">
//         Sign Up
//       </button>
//     </form>
//   );
// }

// export default SignupForm;

function Timer() {
  const divRef = useRef(null);

  useEffect(() => {
    // Scroll the div into view after the component mounts
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div>
      <div style={{ height: "150vh" }}>Scroll Down</div>
      <div ref={divRef}>I scrolled into view!</div>
    </div>
  );
}

export default Timer;

//**  Differences Between useRef and useState:

// Re-renders: Updating a useState value causes the component to re-render, while changing the .current value in useRef does not.

// Use Cases: Use useState when the value needs to be visible in the UI or when it affects rendering. Use useRef when you want to track values that change over time but don't affect rendering (e.g., DOM elements, timers, instance variables).

// import React, { useRef, useEffect } from "react";

// function ScrollIntoView() {
//   const divRef = useRef(null);

//   useEffect(() => {
//     // Scroll the div into view after the component mounts
//     divRef.current.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   return (
//     <div>
//       <div style={{ height: "150vh" }}>Scroll Down</div>
//       <div ref={divRef}>I scrolled into view!</div>
//     </div>
//   );
// }
