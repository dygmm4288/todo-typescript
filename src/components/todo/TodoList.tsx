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
      {todos.map(({ id, title, description }) => (
        <li key={id}>
          <h2>{title}</h2>
          <p>{description}</p>
          <button onClick={handleDeleteTodo(id)}>삭제</button>
          <button onClick={handleToggleTodo(id)}>완료</button>
        </li>
      ))}
    </ul>
  );
}
