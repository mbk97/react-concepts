import React from "react";

const LogProps = (Component) => {
  return (props) => {
    return <Component {...props} hi={"hello, how are you???"} />;
  };
};

export { LogProps };
