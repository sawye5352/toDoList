import "./reset.css";
import "./App.css";
import ToDoInput from "./components/TodoInput";
import ToDoList from "./components/ToDoList";
import CheckAllRemaining from "./components/CheckAllRemaining";
import OtherButtons from "./components/OtherButtons";
import { useEffect, useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);

  let [filterTodos, setFilterTodos] = useState(todos);

  useEffect(() => {
    fetch("http://localhost:5000/toDos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        setFilterTodos(todos);
      });
  }, []);

  let addTodos = (todo) => {
    //server side
    fetch("http://localhost:5000/toDos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    //client side
    setFilterTodos((prevState) => [...prevState, todo]);
  };

  let deleteTodos = (id) => {
    //server side
    fetch(`http://localhost:5000/toDos/${id}`, {
      method: "DELETE",
    });
    //client side
    setFilterTodos((prevState) =>
      prevState.filter((oldToDo) => oldToDo.id !== id)
    );
  };

  let editTodos = (id, title) => {
    //server side
    const todoToUpdate = todos.find((todo) => todo.id === id);
    fetch(`http://localhost:5000/toDos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todoToUpdate.id,
        title,
        completed: todoToUpdate.completed,
      }),
    });
    //client side
    setFilterTodos((prevState) =>
      prevState.map((oldToDo) => {
        if (oldToDo.id === id) {
          return { ...oldToDo, title: title };
        } else {
          return oldToDo;
        }
      })
    );
  };

  let toggleCompleted = (id, updatedTodo) => {
    // Get the current state of the todo

    // server side
    fetch(`http://localhost:5000/toDos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    // client side
    setFilterTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  let clearCompleted = () => {
    //server side
    todos.forEach((todo) => {
      if (todo.completed) {
        deleteTodos(todo.id);
      }
    });
    //client side
    setFilterTodos((prevState) => prevState.filter((todo) => !todo.completed));
  };

  let checkAll = () => {
    // Update each todo on the server
    const updatedTodos = todos.map((todo) => {
      const updatedTodo = { ...todo, completed: true };

      fetch(`http://localhost:5000/toDos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      return updatedTodo;
    });

    // Update the todos in the state
    setFilterTodos(updatedTodos);
  };

  let filterByAll = () => {
    setFilterTodos(todos);
  };

  let filterByActive = () => {
    setFilterTodos(filterTodos.filter((todo) => !todo.completed));
  };

  let filterByCompleted = () => {
    setFilterTodos(todos.filter((todo) => todo.completed));
  };

  let todosRemaining = filterTodos.filter((todo) => !todo.completed).length;

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <ToDoInput addTodos={addTodos} />
        {/* ToDoList */}
        <ToDoList
          todos={filterTodos}
          toggleCompleted={toggleCompleted}
          editTodos={editTodos}
          deleteTodos={deleteTodos}
        />
        {/* checkAll&Remaining */}
        <CheckAllRemaining
          checkAll={checkAll}
          todosRemaining={todosRemaining}
        />
        {/* otherButtons */}
        <OtherButtons
          filterByAll={filterByAll}
          filterByActive={filterByActive}
          filterByCompleted={filterByCompleted}
          clearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
}

export default App;
