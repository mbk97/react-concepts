import React from "react";
import withAuth from "./HocExample";

// !Class component
// class MyComponent extends React.Component {
//   render() {
//     // Use isAuthenticated prop provided by withAuth HOC
//     const { isAuthenticated } = this.props;
//     return isAuthenticated ? (
//       <div>Authenticated</div>
//     ) : (
//       <div>Not Authenticated</div>
//     );
//   }
// }

// export default withAuth(MyComponent);

// ! Function Component
const MyComponent = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <div>I am Logged In</div>
  ) : (
    <div>I am not logged in</div>
  );
};

export default withAuth(MyComponent);
