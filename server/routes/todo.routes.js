const Router = require('express')

const router = new Router()
const todoController = require('../controller/todo.controller')

router.post('/', todoController.createTodo)
router.get('/', todoController.getTodos)

router.put('/', todoController.updateTodo)
router.delete('/', todoController.deleteTodo)


module.exports = router 