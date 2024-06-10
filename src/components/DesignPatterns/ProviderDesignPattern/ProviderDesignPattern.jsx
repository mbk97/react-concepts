import React, { useContext } from "react";
import { UserContext } from "./Provider";

const ProviderDesignPattern = () => {
  const userData = useContext(UserContext);
  console.log(userData);
  return <div>ProviderDesignPattern</div>;
};

export default ProviderDesignPattern;
