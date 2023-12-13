import { useAppDispatch, useAppSelector } from "../../modules/hooks";
import {
  deleteTodo,
  selectTodos,
  toggleTodo,
} from "../../modules/todo/todoSlice";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

enum TodoStatus {
  IS_DONE,
  IS_NOT_DONE,
}

export default function TodoApp() {
  const todos = useAppSelector(selectTodos);

  const dispatch = useAppDispatch();

  const handleDeleteTodo = (id: number) => () => {
    dispatch(deleteTodo(id));
  };
  const handleToggleTodo = (id: number) => () => {
    dispatch(toggleTodo(id));
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
      <TodoForm />
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
