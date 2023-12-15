import useTodos, { getTodoWithIsDone } from "../../hooks/useTodos";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function TodoApp() {
  const { todos } = useTodos();
  const [isDoneTodos, isNotDoneTodos] = getTodoWithIsDone(todos);

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
