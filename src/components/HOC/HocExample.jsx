import React, { useEffect, useState } from "react";

// ! High Order Components are function that takes a component as an argument, returns a new component and additional functionality

// ** They are often used for code reuse, cross-cutting concerns like authentication, logging, etc.

// ! CLASS COMPONENT
// const withAuth = (WrappedComponent) => {
//   return class extends React.Component {
//     constructor(props) {
//       super(props);

//       // Initialize state with isAuthenticated set to false
//       this.state = {
//         isAuthenticated: false,
//       };
//     }
//     componentDidMount() {
//       //! Check authentication logic, e.g., from local storage or server
//       const isAuthenticated = localStorage.getItem("isAuthenticated");
//       this.setState({ isAuthenticated: isAuthenticated === "true" });
//     }

//     render() {
//       const { isAuthenticated } = this.state;
//       // Pass isAuthenticated as a prop to the WrappedComponent
//       return (
//         <WrappedComponent {...this.props} isAuthenticated={isAuthenticated} />
//       );
//     }
//   };
// };

// export default withAuth;

// ! FUNCTION COMPONENT

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//       // Check authentication logic, e.g., from local storage or server
//       const storedAuth = localStorage.getItem("isAuthenticated");
//       setIsAuthenticated(storedAuth === "true");
//     }, []);

//     return <WrappedComponent {...props} isAuthenticated={isAuthenticated} />;
//   };
// };

// export default withAuth;

const withAuth = (WrapppedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const storedAuth = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(storedAuth === "true");
    }, []);

    return <WrapppedComponent {...props} isAuthenticated={isAuthenticated} />;
  };
};

export default withAuth;
