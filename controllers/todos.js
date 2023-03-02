const Todo = require('../models/Todo')

const createTodo = async (req, res, next) => {
  const { title, description, completed } = req.body
  try {
    const todo = await Todo.create({
      userId: req.params.id,
      title,
      description,
      completed,
    })
    res.status(201).json({
      status: 'success',
      message: 'todo added successfully',
      todo,
    })
  } catch (error) {
    next(error)
  }
}

const getCurrentUserTodos = async (req, res, next) => {
  const page = req.query.page || 1
  const limit = 5
  const skip = (page - 1) * limit
  try {
    const allTodos = await (await Todo.find({ userId: req.params.id })).length
    const totalPage = Math.ceil(allTodos / limit)
    const todos = await Todo.find({ userId: req.params.id })
      .skip(skip)
      .limit(limit)
    res.status(200).json({
      status: 'success',
      currentPage: page,
      totalPage,
      count: todos.length,
      itemsInTotal: allTodos,
      todos,
    })
  } catch (error) {
    next(error)
  }
}

const updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.todoId,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json({
      status: 'success',
      message: 'todo updated successfully',
      updatedTodo,
    })
  } catch (error) {
    next(error)
  }
}

const deleteTodo = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.todoId)
    res
      .status(200)
      .json({ status: 'success', message: 'item deleted from list' })
  } catch (error) {
    next(error)
  }
}

module.exports = { createTodo, getCurrentUserTodos, updateTodo, deleteTodo }
