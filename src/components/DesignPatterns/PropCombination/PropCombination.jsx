import React from "react";

// ! This entails creating a single object out of several related props and passing it as a single prop to the component. This pattern allows us to clean up our code and make it simpler to manage the props, making it especially helpful when we want to pass a lot of related properties to a component.

function P(props) {
  const { color, size, children, ...rest } = props;
  return (
    <p style={{ color, fontSize: size }} {...rest}>
      {children}
    </p>
  );
}

const PropCombination = () => {
  const paragraphProps = {
    color: "green",
    size: "40px",
  };
  return (
    <div>
      <P {...paragraphProps}>
        <span>Hello</span>
      </P>
    </div>
  );
};

export default PropCombination;
