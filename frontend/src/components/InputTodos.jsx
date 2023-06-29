import axios from "axios";
import { useState } from "react";
import "../styles/inputTodos.css";

function InputTodos({ setTodo, todo }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    if (name.trim().length) {
      const response = await axios.post(
        "https://mern-todos-backend.vercel.app/addNew",
        {
          name,
        }
      );
      setName("");
      console.log(response.data);
      if (response.data) {
        setTodo([response.data, ...todo]);
      }
    }
    setLoading(false);
  };
  return (
    <div className="inputTodos">
      <input
        type="text"
        placeholder="Enter your todo..."
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
        onClick={handleClick}
      />
      <button type="submit">{loading ? "wait.." : "ADD"}</button>
    </div>
  );
}

export default InputTodos;
