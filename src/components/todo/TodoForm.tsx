import styled from "styled-components";
import useInput from "../../hooks/useInput";
import FloatingInput from "./styles/FloatingInput";

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
    <StForm onSubmit={handleSubmit}>
      <FloatingInput
        value={title}
        onChange={handleTitle}
        required
        placeholder='타이틀을 입력해주세요'
        id='title-input'
      />
      <FloatingInput
        value={description}
        onChange={handleDescription}
        required
        placeholder='자세한 내용을 입력해주세요'
        id='description-input'
      />
      <button type='submit'>투두 생성</button>
      <StToolTip>작성하신 뒤에는 엔터를 눌르세요!</StToolTip>
    </StForm>
  );
}

const StForm = styled.form`
  display: flex;
  flex-direction: row;

  gap: 1.5rem;

  position: relative;

  > button {
    position: absolute;
    opacity: 0;
  }

  padding-bottom: 1.25rem;
`;

const StToolTip = styled.p`
  position: absolute;

  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;

  font-size: 0.75rem;
`;
