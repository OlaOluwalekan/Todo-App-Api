const express = require('express')
const {
  createTodo,
  getCurrentUserTodos,
  updateTodo,
  deleteTodo,
} = require('../controllers/todos')
const { verifyUser } = require('../utils/verify')
const router = express.Router()

router.post('/:id', verifyUser, createTodo)
router.get('/:id/query', verifyUser, getCurrentUserTodos)
router.put('/:id/:todoId', verifyUser, updateTodo)
router.delete('/:id/:todoId', verifyUser, deleteTodo)

module.exports = router
