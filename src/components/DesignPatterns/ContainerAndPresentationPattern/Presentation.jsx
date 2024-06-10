import React from "react";

const Presentation = ({ data, isLoading, error }) => {
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong..</h1>;
  }

  if (data) {
  }
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default Presentation;
