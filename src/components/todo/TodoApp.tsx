import useTodosZustand, {
  getTodoWithIsDone,
} from "../../hooks/useTodosZustand";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function TodoApp() {
  // const { isDoneTodos, isNotDoneTodos } = useTodos();

  const { todos } = useTodosZustand();
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
