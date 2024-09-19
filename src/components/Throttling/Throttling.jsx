import React, { useState } from "react";

// ! Throttling

// ** Throttling ensures that a function is only executed once every specified interval, regardless of how many times the event is triggered within that interval. This technique is useful for scenarios where you want to ensure a function is called at regular intervals without being overwhelmed by the frequency of event triggers.

// ! Example Use Cases:
// ** Scrolling: Update the position of a fixed header only at most once every 200ms while the user scrolls.

// ** Form submission: Ensure a button can only be clicked once every second to prevent multiple submissions.

const throttle = (func, limit) => {
  let inThrottle;
  // ! A variable inThrottle is declared to keep track of whether the function is currently throttled (i.e., whether it can be called or not).

  return function (...args) {
    //! The throttle function returns a new function that takes any number of arguments (...args). This is the function that will be called in place of func.
    if (!inThrottle) {
      // ** The returned function checks if inThrottle is false (i.e., if func is not currently throttled). If inThrottle is true, it means func is still within the throttling period and cannot be called.

      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const ThrottledForm = () => {
  const [formData, setFormData] = useState({ inputField: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a form submission (e.g., API call)
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
    }, 1000);
  };

  const throttledSubmit = throttle(handleSubmit, 5000);

  return (
    <form onSubmit={throttledSubmit}>
      <input
        type="text"
        name="inputField"
        placeholder="Type something..."
        value={formData.inputField}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ThrottledForm;

//! Summary

// **  Debouncing: Delays the execution of the function until after a specified period of time has passed since the last event. Useful for actions triggered by bursty events.

// ** Throttling: Ensures the function is executed at most once in a specified period. Useful for actions triggered by high-frequency events.
