import express from 'express'
import mongodb from 'mongodb'
import path from 'path'

const MongoClient = mongodb.MongoClient

const app = express()
let db: mongodb.Db

app.get('**', express.static(path.resolve(__dirname, '../front')))
app.all('/sub/hook', async (req, res) => {
    await db.collection('subs-log').insertOne({ time: Date.now(), req: {
        method: req.method,
        body: req.body,
        headers: req.headers
    } })
    res.send('ok')
})
app.get('/sub/logs', async (req, res) => {
    const data = await db.collection('subs-log').find().sort({ time: 1 }).toArray()
    res.send(JSON.stringify(data, void 0, 2))
})

MongoClient.connect('mongodb://mongo:27017', { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err
    db = client.db('voms-timeline')

    app.listen(80, () => {
        console.log('LISTEN')
    })
})
