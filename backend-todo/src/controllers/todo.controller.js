const TodoRepository = require('../repositories/todo.repository')
const todoRepository = new TodoRepository()

class TodoController {

    list (req, res) {
        // todo
        // filter, sort, project by req.query

        const todos = todoRepository.getTodos()
        res.json(todos)
    }

    getTodoById (req, res) {
        const id = req.params.id
        const todo = todoRepository.getTodoById(id)
        res.json(todo)
    }

    create (req, res) {
        const todo = req.body
        const new_todo = todoRepository.addTodo(todo)
        res.status(201).send({ success: true, todo: new_todo })
    }

    delete (req, res) {
        const id = req.params.id
        todoRepository.deleteTodoById(id)
        res.status(200).send({ success: true })
    }

    updateTodoStatus (req, res) {
        const id = req.params.id
        const status = req.params.status
        const updated_todo = todoRepository.updateTodoById(id, { status })
        res.status(200).send({ success: true, todo: updated_todo })
    }

    updateTodoTaskName (req, res) {
        const id = req.params.id
        const task = req.params.task
        const updated_todo = todoRepository.updateTodoById(id, { task })
        res.status(200).send({ success: true, todo: updated_todo })
    }

    updateTodoFiles (req, res) {
        const id = req.params.id
        const files = req.body.files
        const updated_todo = todoRepository.updateTodoById(id, { files })
        res.status(200).send({ success: true, todo: updated_todo })
    }

}

module.exports = TodoController