import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type TypeForDeleteTodo = Pick<Todo, "id">;
type TypeForToggleTodo = Pick<Todo, "isDone"> & TypeForDeleteTodo;

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => `/todos`,
      providesTags: (result) =>
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Todos", id } as const)),
              { type: "Todos", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Todos", id: "LIST" }],
    }),
    addTodo: builder.mutation<Todo, Todo>({
      query: (newTodo: Todo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    toggleTodo: builder.mutation<Todo, TypeForToggleTodo>({
      query: ({ id, isDone }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { isDone },
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    deleteTodo: builder.mutation<Todo, TypeForDeleteTodo>({
      query: ({ id }) => ({ url: `todos/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
