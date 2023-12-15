import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useToggleTodoMutation,
} from "../modules/todo/todoApi";

enum TodoStatus {
  IS_DONE,
  IS_NOT_DONE,
}

export default function useTodos() {
  const { data: todosRTKQuery } = useGetTodosQuery();

  const [addTodoMutation] = useAddTodoMutation();
  const [toggleTodoMutation] = useToggleTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();

  const addTodo = (todo: Todo) => {
    addTodoMutation(todo);
  };

  const deleteTodo = (id: TodoId) => {
    deleteTodoMutation({ id });
  };

  const toggleTodo = ({ id, isDone }: Pick<Todo, "id" | "isDone">) => {
    toggleTodoMutation({ id, isDone });
  };

  const [isDoneTodos, isNotDoneTodos] = (todosRTKQuery || []).reduce<
    [Todo[], Todo[]]
  >(
    (acc, todo) => {
      if (todo.isDone) acc[TodoStatus.IS_DONE].push(todo);
      else acc[TodoStatus.IS_NOT_DONE].push(todo);
      return acc;
    },
    [[], []],
  );

  return {
    addTodo,
    deleteTodo,
    toggleTodo,
    isDoneTodos,
    isNotDoneTodos,
  };
}
