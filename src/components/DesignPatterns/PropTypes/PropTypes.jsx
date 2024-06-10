import React from "react";
import PropTypes from "prop-types";

function User({ name, age }) {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
    </div>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

const PropTypesComponent = () => {
  return <User name="Mubarak" age={33} />;
  //   ! Without passing in the prop 'age',  "Failed prop type: The prop `age` is marked as required in `User`, but its value is `undefined".
};

export default PropTypesComponent;
