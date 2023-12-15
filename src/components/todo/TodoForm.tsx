import useInput from "../../hooks/useInput";
import useTodosZustand from "../../hooks/useTodosZustand";
export default function TodoForm() {
  const [title, handleTitle] = useInput();
  const [description, handleDescription] = useInput();
  // const { addTodo } = useTodos();
  const { addTodo } = useTodosZustand();

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
