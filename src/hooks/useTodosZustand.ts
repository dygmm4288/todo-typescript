import { create } from "zustand";
interface TodoState {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const useTodos = create<TodoState>()((set) => ({
  todos: [] as Todo[],
  addTodo: (newTodo: Todo) =>
    set((state) => ({ todos: [newTodo, ...state.todos] })),
  deleteTodo: (id: number) =>
    set((state) => ({ todos: deleteById(state.todos, id) })),
  toggleTodo: (id: number) =>
    set((state) => ({ todos: toggleById(state.todos, id) })),
}));

export default useTodos;

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
