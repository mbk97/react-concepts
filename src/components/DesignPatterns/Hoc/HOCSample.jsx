import React from "react";

// ! A higher-order component takes in a component as an argument and returns a supercharged component injected with additional data or functionality. The possibility of HOCs in React is due to React preference of composition over inheritance.

const highOrderComponent = (Component) => {
  return class HOC extends React.Component {
    state = {
      name: "John Doe",
    };

    render() {
      return <Component name={this.state.name} {...this.props} />;
    }
  };
};

const AvatarComponent = (props) => {
  return (
    <div class="flex items-center justify-between">
      <div class="rounded-full bg-red p-4">{props.name}</div>
      <div>
        <p>I am a {props.description}.</p>
      </div>
    </div>
  );
};

export const SampleHOC = highOrderComponent(AvatarComponent);

// A simple greeting HOC.
const Greetings = ({ name, ...otherProps }) => (
  <div {...otherProps}>Hello {name}!</div>
);

const greetWithName = (BaseComponent) => (props) =>
  <BaseComponent {...props} name="Toptal Engineering Blog" />;

const Enhanced = greetWithName(Greetings);
