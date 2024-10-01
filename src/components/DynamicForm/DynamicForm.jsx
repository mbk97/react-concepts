import React, { useState } from "react";

const DynamicForm = () => {
  const [fields, setFields] = useState([{ name: "" }, { address: "" }]); // Initial state with one input field

  const handleChange = (index, event) => {
    const values = [...fields];
    values[index].name = event.target.value;
    setFields(values);
  };

  const handleAddField = () => {
    setFields([...fields, { name: "" }]); // Add a new field
  };

  const handleRemoveField = (index) => {
    const values = [...fields];
    values.splice(index, 1); // Remove the field at the specified index
    setFields(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted values:", fields);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            value={field.name}
            onChange={(event) => handleChange(index, event)}
            placeholder={`Field #${index + 1}`}
          />
          <button type="button" onClick={() => handleRemoveField(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddField}>
        Add Field
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
