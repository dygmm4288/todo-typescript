import useInput from "../../hooks/useInput";

interface Props {
  addTodo: (todo: Todo) => void;
}
export default function TodoForm({ addTodo }: Props) {
  const [title, handleTitle] = useInput();
  const [description, handleDescription] = useInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      isDone: false,
    };

    addTodo(newTodo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={handleTitle} required />
      <input value={description} onChange={handleDescription} required />
      <button type='submit'>투두 생성</button>
    </form>
  );
}
