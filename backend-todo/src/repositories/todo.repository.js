const TodoMongoDbModel = require('../models/todo.mongodb.model')
const todoModel = new TodoMongoDbModel()
class TodoRepository {
    async getTodos () {
        const todos = await todoModel.getAllTodos()
        return todos
    }

    async getTodoById (id) {
        const todo = await todoModel.getTodoById(id)
        return todo
    }

    async addTodo (todo) {
        const new_todo = await todoModel.addTodo(todo)
        return new_todo
    }

    async deleteTodoById (id) {
        const deleted_todo = await todoModel.deleteTodoById(id)
        return deleted_todo
    }

    async updateTodoById (id, todo) {
        let updated_todo = await todoModel.updateTodoById(id, todo)
        return updated_todo
    }
}

module.exports = TodoRepository