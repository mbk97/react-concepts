import React, { useEffect, useRef, useState } from "react";

// ! The Controlled Input pattern can be used to handle input fields. This pattern involves using an event handler to update the component state if the value of an input field changes, as well as storing the current value of the input field in the component state.

const ControlledInputPattern = () => {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const debounceTimeout = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);

    // ! The function below runs when the user stops typing
    // Clear the previous debounce timer
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new debounce timer
    debounceTimeout.current = setTimeout(() => {
      setDebouncedText(e.target.value);
    }, 500); // 500ms debounce delay
  };

  useEffect(() => {
    // This effect will run only when debouncedText changes
    if (debouncedText) {
      console.log("User stopped typing:", debouncedText);
      // Add your code here to run when the user stops typing
    }
  }, [debouncedText]);
  return (
    <div>
      <h2>ControlledInputPattern</h2>
      <div>
        <input
          type="text"
          className="input border border-3"
          value={text}
          onChange={handleChange}
        />
        <p>Current input: {text}</p>
        <p>Debounced input: {debouncedText}</p>
      </div>
    </div>
  );
};

export default ControlledInputPattern;
