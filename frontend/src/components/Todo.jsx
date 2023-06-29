import { useState } from "react";
import "../styles/todo.css";
import "../styles/inputTodos.css";
import axios from "axios";

function Todo({ name, id, done, setTodo, todo }) {
  const [trueName, setTrueName] = useState(name);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [mydone, setMyDone] = useState(done);
  const handleEdit = () => {
    setEditing(true);
  };
  const edit = async () => {
    const res = await axios.put("https://mern-todos-backend.vercel.app/todo", [
      id,
      { name: newName },
    ]);
    setEditing(false);
    setTrueName(newName);
  };

  const handleDelete = async () => {
    const res = await axios.delete(
      `https://mern-todos-backend.vercel.app/${id}`
    );
    if (res.data._id) {
      const temp = todo.filter((item) => item._id !== id);
      setTodo(temp);
    }
  };

  const handleDone = async () => {
    const res = await axios.put("https://mern-todos-backend.vercel.app/todo", [
      id,
      { done: !mydone },
    ]);
    setMyDone(!mydone);
  };
  return (
    <div className="todo">
      {editing ? (
        <input
          type="text"
          autoFocus
          placeholder="Enter new todo"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
      ) : (
        <div className="name">{trueName}</div>
      )}
      {editing ? (
        <div className="action2">
          <div className="edit_submit" onClick={edit}>
            Submit
          </div>
          <div
            className="edit_cancel"
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </div>
        </div>
      ) : (
        <div className="action">
          <div className="edit" onClick={handleEdit}>
            Edit
          </div>
          <div className="delete" onClick={handleDelete}>
            Delete
          </div>
          <div className="status" onClick={handleDone}>
            {mydone ? "Completed ✅" : "Running ❌"}
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;
