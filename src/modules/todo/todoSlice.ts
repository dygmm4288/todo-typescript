import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import jsonServerInstance from "../../api/api";
import { RootState } from "../store";
// 공식문서 참고 : https://redux.js.org/tutorials/typescript-quick-start

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  isError: boolean;
  error: null | AxiosError;
}

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const fetchTodoThunk = createAsyncThunk(
  "todo/fetchTodoThunk",
  async (_, thunkAPI) => {
    try {
      const response = await jsonServerInstance.get("/todos");
      return response.data as Todo[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error as AxiosError);
    }
  },
);
export const addTodoThunk = createAsyncThunk(
  "todo/addTodoThunk",
  async (todo: Todo, thunkAPI) => {
    try {
      const response = await jsonServerInstance.post("/todos", todo);
      return response.data as Todo;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as AxiosError);
    }
  },
);
export const deleteTodoThunk = createAsyncThunk(
  "todo/deleteTodoThunk",
  async (id: TodoId, thunkAPI) => {
    try {
      await jsonServerInstance.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as AxiosError);
    }
  },
);
export const toggleTodoThunk = createAsyncThunk(
  "todo/toggleTodoThunk",
  async ({ id, isDone }: Pick<Todo, "id" | "isDone">, thunkAPI) => {
    try {
      await jsonServerInstance.patch(`/todos/${id}`, {
        isDone,
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as AxiosError);
    }
  },
);
type Keys = [
  typeof fetchTodoThunk,
  typeof addTodoThunk,
  typeof deleteTodoThunk,
  typeof toggleTodoThunk,
];

function addPendingCaseThunks(
  this: ActionReducerMapBuilder<TodoState>,
  thunks: Keys,
) {
  return thunks.reduce<typeof this>((builder, cur) => {
    return builder.addCase(cur.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
  }, this);
}

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addPendingCaseThunks
      .call(builder, [
        fetchTodoThunk,
        addTodoThunk,
        deleteTodoThunk,
        toggleTodoThunk,
      ])
      .addCase(
        fetchTodoThunk.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.isLoading = false;
          state.todos = action.payload;
        },
      )
      .addCase(
        fetchTodoThunk.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isError = true;
          state.isLoading = false;
          if (action.payload instanceof AxiosError) {
            state.error = action.payload;
          }
        },
      )
      .addCase(addTodoThunk.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.isLoading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodoThunk.rejected, (state, action) => {
        state.isError = true;
        if (action.payload instanceof AxiosError) {
          state.error = action.payload;
        }
      })
      .addCase(
        deleteTodoThunk.fulfilled,
        (state, action: PayloadAction<TodoId>) => {
          state.isLoading = false;
          const index = findIndexByTodoId(state.todos, action.payload);
          state.todos.splice(index, 1);
        },
      )
      .addCase(deleteTodoThunk.rejected, (state, action) => {
        state.isError = true;
        if (action.payload instanceof AxiosError) {
          state.error = action.payload;
        }
      })
      .addCase(
        toggleTodoThunk.fulfilled,
        (state, action: PayloadAction<TodoId>) => {
          state.isLoading = false;
          const index = findIndexByTodoId(state.todos, action.payload);
          state.todos[index].isDone = !state.todos[index].isDone;
        },
      )
      .addCase(toggleTodoThunk.rejected, (state, action) => {
        state.isError = true;
        if (action.payload instanceof AxiosError) {
          state.error = action.payload;
        }
      });
  },
});

const findIndexByTodoId = (todos: Todo[], id: TodoId) =>
  todos.findIndex((todo) => todo.id === id);

export const selectTodos = (store: RootState) => store.todoReducer.todos;
export const selectTodoReducer = (store: RootState) => store.todoReducer;
export default todoSlice.reducer;
