const Database = require('../database/index')
const database = new Database()
const ObjectID = require('mongodb').ObjectID
class TodoRepository {
    async getTodos () {
        const db = await database.getDb()
        const find_result = await db.collection('todos').find().toArray()
        const todos = this._removeMongoDbUnderscoreId(find_result)
        return todos
    }

    async getTodoById (id) {
        const object_id = new ObjectID(id)
        const db = await database.getDb()
        const find_result = await db.collection('todos').find({ _id: object_id }).toArray()
        const todo = this._removeMongoDbUnderscoreId(find_result)[0]
        return todo
    }

    async addTodo (todo) {
        const db = await database.getDb()
        const insert_result = await db.collection('todos').insertOne(todo)
        const new_todo = this._removeMongoDbUnderscoreId(insert_result.ops)[0]
        return new_todo
    }

    async deleteTodoById (id) {
        const object_id = new ObjectID(id)
        const db = await database.getDb()
        await db.collection('todos').deleteOne({ _id: object_id })
        return
    }

    async updateTodoById (id, todo) {
        let update_todo = await this.getTodoById(id)
        if (update_todo) {
            for (const key of Object.keys(todo)) {
                if (key == 'id') continue
                update_todo[key] = todo[key]
            }
            const object_id = new ObjectID(update_todo.id)
            delete update_todo.id
            const db = await database.getDb()
            await db.collection('todos').updateOne(
                {_id: object_id}, 
                { $set: {...update_todo} }, 
                { upsert: true }
            )
            const updated_todo = await this.getTodoById(id)
            return updated_todo
        } else {
            return update_todo
        }
    }

    _removeMongoDbUnderscoreId(array) {
        return array.map(res => {
            res.id = res._id
            delete res._id
            return res
        })
    }
}

module.exports = TodoRepository