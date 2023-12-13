interface Props {
  todos: Todo[];
  handleDeleteTodo: (id: number) => () => void;
  handleToggleTodo: (id: number) => () => void;
}
export default function TodoList({
  todos,
  handleDeleteTodo,
  handleToggleTodo,
}: Props) {
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
