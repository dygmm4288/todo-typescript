import { Provider } from "react-redux";
import TodoApp from "./components/todo/TodoApp";
import store from "./modules/store";

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;
