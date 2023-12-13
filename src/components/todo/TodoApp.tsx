import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
enum TodoStatus {
  IS_DONE,
  IS_NOT_DONE,
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) return { ...todo, isDone: !todo.isDone };
        return todo;
      }),
    );
  };
  const handleDeleteTodo = (id: number) => () => {
    deleteTodo(id);
  };
  const handleToggleTodo = (id: number) => () => {
    toggleTodo(id);
  };

  const [isDoneTodos, isNotDoneTodos] = todos.reduce<[Todo[], Todo[]]>(
    (acc, todo) => {
      if (todo.isDone) acc[TodoStatus.IS_DONE].push(todo);
      else acc[TodoStatus.IS_NOT_DONE].push(todo);
      return acc;
    },
    [[], []],
  );

  return (
    <>
      <TodoForm addTodo={addTodo} />
      <section>
        <h1>working todo</h1>
        <TodoList
          todos={isNotDoneTodos}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
        />
      </section>
      <hr />
      <section>
        <h1>done todo</h1>
        <TodoList
          todos={isDoneTodos}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
        />
      </section>
    </>
  );
}
