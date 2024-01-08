import React, { useState } from "react";

export default function ToDo({ todo, toggleCompleted, editTodos,deleteTodos  }) {
  let [editStatus, setEditStatus] = useState(false);

  let [edit, setEdit] = useState(todo.title);

  let editHandler = (event) => {
    event.preventDefault();
    editTodos(todo.id, edit);
    setEditStatus(false);
  };

  let deleteHandler = () => {
    deleteTodos(todo.id)
  }

  let handleCompleted = () => {
    let updatedTodo = {
      id: todo.id,
      title: todo.title,
      completed: !todo.completed
    }
    toggleCompleted(todo.id, updatedTodo)
  }
  return (
    <div>
      <li className="todo-item-container">
        <div className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCompleted()}
          />
          {!editStatus && (
            <span
              onDoubleClick={() => setEditStatus(true)}
              className={`todo-item-label ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.title}
            </span>
          )}
          {editStatus && (
            <form onSubmit={editHandler}>
              <input
                className="todo-item-input"
                type="text"
                placeholder={todo.title}
                onChange={(event) => setEdit(event.target.value)}
                value={edit}
              />
            </form>
          )}
        </div>
        <button className="x-button" onClick={() => deleteHandler()}>
          <svg
            className="x-button-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </li>
    </div>
  );
}
