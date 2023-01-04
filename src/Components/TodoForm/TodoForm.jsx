import React, { useState, useEffect, useRef } from "react";

const TodoForm = (props) => {
  const [input, setInput] = useState("");

  // const inputRef =

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({ id: Math.floor(Math.random() * 10000), text: input });
    setInput("");
  };

  const handleFormChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <form className="todo-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Add a todo"
        value={input}
        name="text"
        className="todo-input"
        onChange={handleFormChange}
      />
      <button className="todo-button">add todo</button>
    </form>
  );
};

export default TodoForm;
