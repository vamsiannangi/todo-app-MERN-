// const todo=require("../models/list");
// const router=require("express").Router();
// const todoListcontroller=require("../controllers/todoListController");

// router.post("/addTodo",todoListcontroller.addTask)

// router.put("/:id", todoListcontroller.updateTodo);
// module.exports=router;



const express = require('express');
const todoListController = require('../controllers/todoListController');
const router = express.Router();
const middleware=require('../controllers/middleware')
router.post('/addTodo',middleware, todoListController.addTask);
router.put('/:id', todoListController.updateTodo);
router.delete('/:id',todoListController.deleteTodo);
router.get('/myList',middleware, todoListController.getList);

module.exports = router;
