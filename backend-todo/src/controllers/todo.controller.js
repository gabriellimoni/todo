const TodoRepository = require('../repositories/todo.repository')
const todoRepository = new TodoRepository()

class TodoController {

    async list (req, res) {
        // todo
        // filter, sort, project by req.query

        const todos = await todoRepository.getTodos()
        res.json(todos)
    }

    async getTodoById (req, res) {
        const id = req.params.id
        const todo = await todoRepository.getTodoById(id)
        res.json(todo)
    }

    async create (req, res) {
        const todo = req.body
        const new_todo = await todoRepository.addTodo(todo)
        res.status(201).send({ success: true, todo: new_todo })
    }

    async delete (req, res) {
        const id = req.params.id
        await todoRepository.deleteTodoById(id)
        res.status(200).send({ success: true })
    }

    async updateTodoStatus (req, res) {
        const id = req.params.id
        const status = req.params.status
        const updated_todo = await todoRepository.updateTodoById(id, { status })
        res.status(200).send({ success: true, todo: updated_todo })
    }

    async updateTodoTaskName (req, res) {
        const id = req.params.id
        const task = req.params.task
        const updated_todo = await todoRepository.updateTodoById(id, { task })
        res.status(200).send({ success: true, todo: updated_todo })
    }

    async updateTodoFiles (req, res) {
        const id = req.params.id
        const files = req.body.files
        const updated_todo = await todoRepository.updateTodoById(id, { files })
        res.status(200).send({ success: true, todo: updated_todo })
    }

}

module.exports = TodoController