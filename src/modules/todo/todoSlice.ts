import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
// 공식문서 참고 : https://redux.js.org/tutorials/typescript-quick-start

export interface TodoState {
  todos: Todo[];
}
const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<TodoId>) => {
      const index = findIndexByTodoId(state.todos, action.payload);
      if (index === -1) return state;
      state.todos.splice(index, 1);
    },
    toggleTodo: (state, action: PayloadAction<TodoId>) => {
      const index = findIndexByTodoId(state.todos, action.payload);
      if (index === -1) return state;
      const isDone = state.todos[index].isDone;
      state.todos[index].isDone = !isDone;
    },
  },
});

const findIndexByTodoId = (todos: Todo[], id: TodoId) =>
  todos.findIndex((todo) => todo.id === id);

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;

export const selectTodos = (store: RootState) => store.todoReducer.todos;
export default todoSlice.reducer;
