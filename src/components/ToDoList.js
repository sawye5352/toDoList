import React from "react";
import ToDo from "./ToDo";

export default function ToDoList({ todos, toggleCompleted, editTodos, deleteTodos }) {

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <ToDo key={todo.id} todo={todo} editTodos={editTodos} deleteTodos={deleteTodos} toggleCompleted={toggleCompleted} />
      ))}
    </ul>
  );
}
