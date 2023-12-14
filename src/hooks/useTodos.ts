import { useAppDispatch, useAppSelector } from "../modules/hooks";
import {
  addTodo as addTodoSlice,
  deleteTodo as deleteTodoSlice,
  selectTodos,
  toggleTodo as toggleTodoSlice,
} from "../modules/todo/todoSlice";

enum TodoStatus {
  IS_DONE,
  IS_NOT_DONE,
}

export default function useTodos() {
  const todos = useAppSelector(selectTodos);

  const dispatch = useAppDispatch();

  const addTodo = (todo: Todo) => {
    dispatch(addTodoSlice(todo));
  };

  const deleteTodo = (id: TodoId) => {
    dispatch(deleteTodoSlice(id));
  };

  const toggleTodo = (id: TodoId) => {
    dispatch(toggleTodoSlice(id));
  };

  const [isDoneTodos, isNotDoneTodos] = todos.reduce<[Todo[], Todo[]]>(
    (acc, todo) => {
      if (todo.isDone) acc[TodoStatus.IS_DONE].push(todo);
      else acc[TodoStatus.IS_NOT_DONE].push(todo);
      return acc;
    },
    [[], []],
  );

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    isDoneTodos,
    isNotDoneTodos,
  };
}
