import useInput from "../../hooks/useInput";
import useTodos from "../../hooks/useTodos";
export default function TodoForm() {
  const [title, handleTitle] = useInput();
  const [description, handleDescription] = useInput();
  const { addTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Partial<Todo> = {
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
