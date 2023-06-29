const { Schema, model } = require("mongoose");

const TodoSchema = new Schema({
  name: { type: String, require: true },
  done: { type: Boolean, default: false },
  time: { type: Date, default: Date.now },
});

const Todo = model("Todo", TodoSchema);

module.exports = Todo;
