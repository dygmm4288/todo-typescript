import useTodosZustand from "../../hooks/useTodosZustand";

interface Props {
  todos: Todo[];
}
export default function TodoList({ todos }: Props) {
  // const { deleteTodo, toggleTodo } = useTodos();
  const { deleteTodo, toggleTodo } = useTodosZustand();

  const handleDeleteTodo = (id: number) => () => {
    deleteTodo(id);
  };
  const handleToggleTodo = (id: number) => () => {
    toggleTodo(id);
  };

  return (
    <ul>
      {todos.map(({ id, title, description, isDone }) => (
        <li key={id}>
          <h2>{title}</h2>
          <p>{description}</p>
          <button onClick={handleDeleteTodo(id)}>삭제</button>
          <button onClick={handleToggleTodo(id)}>
            {!isDone ? "완료" : "취소"}
          </button>
        </li>
      ))}
    </ul>
  );
}
