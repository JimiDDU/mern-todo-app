const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Todo = require("./models/todos");
const port = process.env.PORT;
const mongo_url = process.env.MONGO_CONNECT;

const server = express();
server.use(express.json());
server.use(cors());

mongoose.connect(mongo_url).then((data) => {
  console.log("connected to database");
});

server.post("/addNew", async (req, res) => {
  const data = req.body;
  const todo = await Todo(data);
  await todo.save();
  res.send(todo);
});

server.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort({ time: -1 });
  res.send(todos);
});

server.put("/todo", async (req, res) => {
  const [id, obj] = await req.body;
  const todo = await Todo.findByIdAndUpdate(id, obj);
  res.send(todo);
});

server.delete("/:id", async (req, res) => {
  const id = await req.params.id;
  const todo = await Todo.findByIdAndDelete(id);
  res.send(todo);
});

server.listen(port, () => {
  console.log("server started on port 4000");
});
