import { create } from "zustand";
enum TodoStatus {
  IS_DONE,
  IS_NOT_DONE,
}
interface TodoState {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const useTodosZustand = create<TodoState>()((set) => ({
  todos: [] as Todo[],
  addTodo: (newTodo: Todo) =>
    set((state) => ({ todos: [newTodo, ...state.todos] })),
  deleteTodo: (id: number) =>
    set((state) => ({ todos: deleteById(state.todos, id) })),
  toggleTodo: (id: number) =>
    set((state) => ({ todos: toggleById(state.todos, id) })),
}));

export default useTodosZustand;

type Id = { id: number };
type IsDone = { isDone: boolean };
type CanToggleWithId = Id & IsDone;

function deleteById<T extends Id>(arr: T[], id: number) {
  return arr.filter((item) => item.id !== id);
}
function toggleById<T extends CanToggleWithId>(arr: T[], id: number) {
  return arr.map((item) =>
    item.id === id ? { ...item, isDone: !item.isDone } : item,
  );
}

export const getTodoWithIsDone = (todos: Todo[]) =>
  todos.reduce<[Todo[], Todo[]]>(
    (acc, todo) => {
      if (todo.isDone) acc[TodoStatus.IS_DONE].push(todo);
      else acc[TodoStatus.IS_NOT_DONE].push(todo);
      return acc;
    },
    [[], []],
  );
