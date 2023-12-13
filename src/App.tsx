import { Provider } from "react-redux";
import TodoApp from "./components/todo/TodoApp";
import { TodosProvider } from "./hooks/useTodos.react-query";
import store from "./modules/store";

function App() {
  return (
    <Provider store={store}>
      <TodosProvider>
        <TodoApp />
      </TodosProvider>
    </Provider>
  );
}

export default App;
