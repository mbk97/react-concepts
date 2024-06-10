import React, { useReducer } from "react";

// ! State management with Reducers

// ** Most often, handling many states in a component leads to issues with many ungrouped states, which can be burdensome and challenging to handle. The reducer pattern can be a helpful option in this situation. We can categorize states using reducers into certain actions that, when executed, can change the grouped states.

//! Overall, useReducer offers a more structured and maintainable approach to managing complex state logic, making it a preferable choice in many scenarios.

const initState = {
  loggedIn: false,
  user: null,
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        loggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "logout":
      return initState;
    default:
      break;
  }
};

const StateManagementWithReducers = () => {
  const [state, dispatch] = useReducer(authReducer, initState);

  const login = () => {
    dispatch({
      type: "login",
      payload: {
        user: "Mubarak Muhammed",
        token: "I am the token",
      },
    });
  };

  const logOut = () => {
    dispatch({ type: "logout" });
  };
  return (
    <div>
      {state.loggedIn ? (
        <div>
          <p> Welcome {state.user.name} </p>
          <button onClick={logOut}></button>
        </div>
      ) : (
        <form onSubmit={login}>
          <input type="text" className="border-2 " />
          <input type="password" className="input border-4" />
          <button type="submit"></button>
        </form>
      )}
    </div>
  );
};

export default StateManagementWithReducers;
