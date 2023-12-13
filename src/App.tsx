import TodoApp from "./components/todo/TodoApp";
import { TodosProvider } from "./hooks/useTodos";

function App() {
  return (
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  );
}

export default App;
