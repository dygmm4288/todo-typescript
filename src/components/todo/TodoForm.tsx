import useInput from "../../hooks/useInput";
import { useAppDispatch } from "../../modules/hooks";
import { addTodo } from "../../modules/todo/todoSlice";
export default function TodoForm() {
  const [title, handleTitle] = useInput();
  const [description, handleDescription] = useInput();

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      isDone: false,
    };

    dispatch(addTodo(newTodo));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={handleTitle} required />
      <input value={description} onChange={handleDescription} required />
      <button type='submit'>투두 생성</button>
    </form>
  );
}
