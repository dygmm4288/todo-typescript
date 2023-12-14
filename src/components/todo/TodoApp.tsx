import { useState } from "react";
import styled from "styled-components";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

enum TodoStatus {
  IS_DONE,
  IS_NOT_DONE,
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) return { ...todo, isDone: !todo.isDone };
        return todo;
      }),
    );
  };
  const handleDeleteTodo = (id: number) => () => {
    deleteTodo(id);
  };
  const handleToggleTodo = (id: number) => () => {
    toggleTodo(id);
  };

  const [isDoneTodos, isNotDoneTodos] = todos.reduce<[Todo[], Todo[]]>(
    (acc, todo) => {
      if (todo.isDone) acc[TodoStatus.IS_DONE].push(todo);
      else acc[TodoStatus.IS_NOT_DONE].push(todo);
      return acc;
    },
    [[], []],
  );

  return (
    <StTodoWrapper>
      <h1>What's Your Todo ? </h1>
      <TodoForm addTodo={addTodo} />

      <StTodoListContainer>
        <StTodoSection>
          <h1>Working Todo</h1>
          <span>Hurry Up! Don't Waste Your Time</span>
          <TodoList
            todos={isNotDoneTodos}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleTodo={handleToggleTodo}
          />
        </StTodoSection>
        <StTodoSection>
          <h1>Done Todo</h1>
          <span>Keep Going! You can do it!</span>
          <TodoList
            todos={isDoneTodos}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleTodo={handleToggleTodo}
          />
        </StTodoSection>
      </StTodoListContainer>
    </StTodoWrapper>
  );
}

const StTodoWrapper = styled.div`
  min-width: 800px;
  max-width: 1200px;
  height: 100vh;

  margin: 0 auto;
  padding: 1rem;

  background-color: lightblue;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  > h1 {
    margin: 0 auto;
    padding: 2rem;
    font-size: 5rem;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: -0.1rem;
  }

  form {
    margin: 0 auto;
  }
`;

const StTodoListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;

  > * {
    flex: 1;
  }
`;

const StTodoSection = styled.section`
  h1 {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
  }
  span {
    margin-top: 0.25rem;
    text-align: center;
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
  }
`;
