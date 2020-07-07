const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()

const TodoController = require('./controllers/todo.controller')
const todoController = new TodoController()
const UploadController = require('./controllers/upload.controller')
const uploadController = new UploadController()

router
    .get('/todos', todoController.list)
    .get('/todos/:id', todoController.getTodoById)
    .post('/todos', todoController.create)
    .delete('/todos/:id', todoController.delete)
    .patch('/todos/:id/status/:status', todoController.updateTodoStatus)
    .patch('/todos/:id/name/:task', todoController.updateTodoTaskName)
    .patch('/todos/:id/file', todoController.updateTodoFileUri)
    
    .post('/upload', upload.single('file'), uploadController.uploadFile)

module.exports = router