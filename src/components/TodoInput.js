import React, { useState } from "react";

export default function TodoInput({ addTodos }) {
  let [title, setTitle] = useState("");

  let inputHandler = (event) => {
    setTitle(event.target.value);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    let todo = {
      id: Math.random(),
      title,
      completed: false,
    };
    addTodos(todo);
    setTitle("")
  };

  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={inputHandler}
        value={title}
      />
    </form>
  );
}
