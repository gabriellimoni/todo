const MongoClient = require('mongodb').MongoClient
const uri = process.env.MONGO_DB_URL

class MongoDbDatabase {
    _db = null
    
    // singleton
    async getDb () {
        if (!this._db) {
            const client = new MongoClient(uri, { useNewUrlParser: true })
            const clientConnection = await client.connect()
            this._db = clientConnection.db(process.env.MONGO_DB_DB)
        }
        return this._db
    }
}

module.exports = MongoDbDatabase
