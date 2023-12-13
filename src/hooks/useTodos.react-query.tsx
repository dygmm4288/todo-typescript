import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";
import jsonServerInstance from "../api/api";

enum TodoStatus {
  IS_DONE,
  IS_NOT_DONE,
}

export default function useTodos() {
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodo,
    initialData: [],
  });

  const client = useQueryClient();

  const { mutate: addTodo } = useMutation({
    mutationFn: addTodoMutation,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const { mutate: deleteTodo } = useMutation({
    mutationFn: deleteTodoMutation,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const { mutate: toggleTodo } = useMutation({
    mutationFn: toggleTodoMutation,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todos"] });
    },
  });

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

  return { isDoneTodos, isNotDoneTodos, addTodo, deleteTodo, toggleTodo };
}
export function TodosProvider({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

async function fetchTodo(): Promise<Todo[]> {
  try {
    const response = await jsonServerInstance.get("/todos");
    return response.data as Todo[];
  } catch {
    throw new Error("fetch todo error");
  }
}
async function addTodoMutation(newTodo: Partial<Todo>) {
  try {
    await jsonServerInstance.post("/todos", newTodo);
  } catch {
    throw new Error("add todo error");
  }
}
async function deleteTodoMutation(id: TodoId) {
  try {
    await jsonServerInstance.delete(`/todos/${id}`);
  } catch {
    throw new Error("delete todo error");
  }
}
async function toggleTodoMutation({ id, isDone }: Partial<Todo>) {
  try {
    await jsonServerInstance.patch(`/todos/${id}`, { isDone });
  } catch {
    throw new Error("toggle todo error");
  }
}
