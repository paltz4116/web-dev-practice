const Todo = require(`../models/todo-model`);

async function getTodos(req, res, next) {
  let todos;

  try {
    todos = await Todo.getTodos();
  } catch (error) {
    return next(error);
  }

  res.json({
    todos: todos,
  });
}

async function addTodo(req, res, next) {
  const todoText = req.body.text;

  const todo = new Todo(todoText);

  let result;

  try {
    result = await todo.save();
  } catch (error) {
    return next(error);
  }

  todo.id = result.insertedId.toString();

  res.json({
    message: `Added todo successfully.`,
    createdTodo: todo,
  });
}

function updateTodo(req, res, next) {}

function deleteTodo(req, res, next) {}

module.exports = {
  getTodos: getTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
