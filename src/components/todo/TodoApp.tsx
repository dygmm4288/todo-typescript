import { useEffect } from "react";
import useTodos from "../../hooks/useTodos";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function TodoApp() {
  const { isDoneTodos, isNotDoneTodos, fetchTodos, error } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <>
      <TodoForm />
      <section>
        <h1>working todo</h1>
        <TodoList todos={isNotDoneTodos} />
      </section>
      <hr />
      <section>
        <h1>done todo</h1>
        <TodoList todos={isDoneTodos} />
      </section>
    </>
  );
}
