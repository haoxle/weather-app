import React, { useState } from "react";
import Todo from "../../Components/Todo/Todo";
import TodoForm from "../../Components/TodoForm/TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const addToDo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newToDos = [todo, ...todos];
    setTodos(newToDos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <TodoForm onSubmit={addToDo} />
      <Todo
        todos={todos}
        completeTodos={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default TodoList;
