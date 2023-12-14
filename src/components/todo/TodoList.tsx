import styled from "styled-components";

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
    <StTodoContainer>
      {todos.map(({ id, title, description, isDone }) => (
        <StTodoItemWrapper key={id}>
          <h2>{title}</h2>
          <p>{description}</p>
          <div>
            <StButton onClick={handleDeleteTodo(id)}>삭제</StButton>
            <StButton onClick={handleToggleTodo(id)}>
              {!isDone ? "완료" : "취소"}
            </StButton>
          </div>
        </StTodoItemWrapper>
      ))}
    </StTodoContainer>
  );
}

const StTodoContainer = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 1rem;

  padding: 1rem;
`;

const StTodoItemWrapper = styled.li`
  border: 1px solid black;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
  }
  p {
    font-size: 0.8rem;
  }
  div {
    align-self: center;
  }
  flex-wrap: wrap;
`;
const StButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;
