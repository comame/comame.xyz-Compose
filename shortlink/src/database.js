class Database {
    constructor(db, collection) {
        this.collection = db.collection(collection)
    }
    
    async get(id) {
        const result = await this.collection.findOne({
            key: '' + id
        })
        return result
    }

    async list() {
        const cursor = await this.collection.find({})
        const result = await cursor.toArray()
        result.forEach(el => { delete el._id })
        return result
    }

    async remove(id) {
        const result = await this.collection.findOneAndDelete({
            key: '' + id
        })
        return result
    }

    async create(id, url) {
        const find = await this.collection.findOne({
            key: id
        })
        if (find == null) {
            await this.collection.insertOne({
                key: '' + id,
                url: '' + url
            })
        }
    }
}

module.exports = Database
