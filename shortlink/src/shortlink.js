class Shortlink {
    static async create(id, url, db) {
        await db.create(id, url)
        return
    }

    static async remove(id, db) {
        await db.remove(id)
        return
    }

    static async get(id, db) {
        const result = await db.get(id)
        return result && result.url
    }

    static async list(db) {
        return await db.list()
    }
}

module.exports = Shortlink
