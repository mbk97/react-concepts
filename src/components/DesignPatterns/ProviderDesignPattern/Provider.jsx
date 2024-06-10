import React, { createContext } from "react";
import ProviderDesignPattern from "./ProviderDesignPattern";

// ! Using the provider design pattern, we can prevent our application from prop drilling or sending props to nested components in a tree.

export const UserContext = createContext();

export default Provider = () => {
  const userObject = {
    name: "Mubarak",
    age: "44",
  };
  return (
    <UserContext.Provider value="spanish-songs">
      <ProviderDesignPattern />
    </UserContext.Provider>
  );
};
