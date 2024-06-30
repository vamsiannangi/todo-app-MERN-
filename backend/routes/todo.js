const express = require('express');
const todoListController = require('../controllers/todoListController');
const router = express.Router();
const middleware=require('../controllers/middleware')
router.post('/addTodo',middleware, todoListController.addTask);
router.put('/:id', middleware,todoListController.updateTodo);
router.delete('/:id',middleware,todoListController.deleteTodo);
router.get('/myList',middleware, todoListController.getList);
router.get('/:id', middleware, todoListController.getTodoById);

module.exports = router;
