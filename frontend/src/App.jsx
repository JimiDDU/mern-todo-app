import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import InputTodos from "./components/InputTodos";
import Todo from "./components/Todo";
import "./styles/global.css";

function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const res = await axios.get("https://mern-todo-app2.vercel.app/todos");
    setTodos(res.data);
  };
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="App">
      <Header></Header>
      <InputTodos setTodo={setTodos} todo={todos}></InputTodos>
      <h2>Todos</h2>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo._id}
            name={todo.name}
            id={todo._id}
            done={todo.done}
            setTodo={setTodos}
            todo={todos}
          ></Todo>
        );
      })}
    </div>
  );
}

export default App;
