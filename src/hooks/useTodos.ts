import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../modules/hooks";
import {
  addTodoThunk,
  deleteTodoThunk,
  fetchTodoThunk,
  selectTodoReducer,
  selectTodos,
  toggleTodoThunk,
} from "../modules/todo/todoSlice";

enum TodoStatus {
  IS_DONE,
  IS_NOT_DONE,
}

export default function useTodos() {
  const todos = useAppSelector(selectTodos);
  const { error } = useAppSelector(selectTodoReducer);

  const dispatch = useAppDispatch();

  const addTodo = (todo: Todo) => {
    dispatch(addTodoThunk(todo));
  };

  const deleteTodo = (id: TodoId) => {
    dispatch(deleteTodoThunk(id));
  };

  const toggleTodo = ({ id, isDone }: Pick<Todo, "id" | "isDone">) => {
    dispatch(toggleTodoThunk({ id, isDone }));
  };

  const fetchTodos = async () => {
    dispatch(fetchTodoThunk());
  };

  // ? 이 부분에서 이렇게 해버린다면
  // ? 다른 컴포넌트에서 커스텀 훅을 사용할 때마다 계산을 하기 떄문에
  // ? 굉장히 비 효율적으로 작동할 것 같은데...
  // ? 생각 1 : useMemo를 사용해서 쓸데없는 계산을 막는다.
  // ? -> useMemo를 사용하면 배열이 dependency가 되는데 배열은 Object.is로 비교하면 어떤 결과가 나오지?
  // ? -> 어차피 todos가 바뀌었다라는 것은 불변성 때문에 다른 todos
  // ? 생각 2 : 부모 컴포넌트에서 계산한 후에 props로 내려준다.
  // ? -> 이렇게하면 계산은 한번만 하면 되기 때문에 더 효율적일 것 같다.(현재보다는)

  const [isDoneTodos, isNotDoneTodos] = useMemo(
    () =>
      todos.reduce<[Todo[], Todo[]]>(
        (acc, todo) => {
          if (todo.isDone) acc[TodoStatus.IS_DONE].push(todo);
          else acc[TodoStatus.IS_NOT_DONE].push(todo);
          return acc;
        },
        [[], []],
      ),
    [todos],
  );

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    fetchTodos,
    isDoneTodos,
    isNotDoneTodos,
    error,
  };
}
