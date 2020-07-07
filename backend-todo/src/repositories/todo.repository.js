class TodoRepository {
    _todos = new Array()

    // development purposes
        constructor () {
        this._todos.push({
            id: 1,
            task: 'Task',
            status: 'pending',
            file_url: 'http://localhost:3000/storage/teste.txt',
        })
        this._todos.push({
            id: 2,
            task: 'Task 02',
            status: 'completed',
            file_url: 'http://localhost:3000/storage/teste.txt',
        })
    }

    getTodos () {
        return this._todos
    }

    getTodoById (id) {
        const found_todo = this._todos.find(todo => todo.id == id)
        return found_todo
    }

    addTodo (todo) {
        const id = this._getNextId()
        const new_todo = { id, ...todo }
        this._todos.push(new_todo)
        return new_todo
    }

    deleteTodoById (id) {
        const deleted_set = this._todos.filter(todo => todo.id != id)
        this._todos = deleted_set
        return
    }

    updateTodoById (id, todo) {
        let update_todo = this._todos.find(t => t.id == id)
        if (update_todo) {
            for (const key of Object.keys(todo)) {
                console.log(update_todo[key], todo)
                if (key == 'id') continue
                update_todo[key] = todo[key]
            }
        }
        return update_todo
    }

    _getNextId () {
        if (this._todos.length == 0) return 1

        const all_ids = this._todos.map(todo => +todo.id)
        const higher_id = Math.max(...all_ids)
        return higher_id + 1
    }
}

module.exports = TodoRepository