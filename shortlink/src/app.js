const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')

const password = require('./password.json').password
const Shortlink = require('./shortlink')
const Database = require('./database')

const MongoClient = mongodb.MongoClient;
const dbUrl = 'mongodb://mongo:27017'
const dbName = 'shortlink'

let client = null
let db = null

const app = express()
app.use(bodyParser.json())

app.use(async (req, res, next) => {
    if (client.isConnected) {
        return next()
    }

    console.log('DB DISCONNECTED, Connecting...')
    try {
        client = await MongoClient.connect(dbUrl, { useNewUrlParser: true})
    } catch (err) {
        console.error('Cannot connect to MongoDB')
        console.error(err.message)
        return res.send(500)
    }

    db = new Database(client.db(dbName), 'links')
    console.log('DB CONNECTED')
    next()
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/list', (req, res) => {
    Shortlink.list(db).then(list => {
        res.send(JSON.stringify(list))
    })
})

app.get("/:key", (req, res) => {
    const key = req.params.key
    Shortlink.get(key, db).then(url => {
        if (url) {
            res.redirect(url)
        } else {
            res.sendStatus(404)
        }
    })
})

app.post('/create', (req, res) => {
    const obj = req.body
    if (obj.password != password) {
        return res.sendStatus(403)
    }
    if (!(obj.id && obj.url)) {
        return res.sendStatus(400)
    }
    Shortlink.create(obj.id, obj.url, db).then(() => {
        res.sendStatus(200)
    })
})

app.post('/delete/:id', (req, res) => {
    const id = req.params.id
    if (req.body.password != password) {
        return res.sendStatus(403)
    }
    Shortlink.remove(id, db).then(() => {
        res.sendStatus(200)
    })
})

async function start() {
    try {
        client = await MongoClient.connect(dbUrl, { useNewUrlParser: true })
    } catch (err) {
        console.error('CONNECT ERROR, retrying...')
        console.error(err.message)
        setTimeout(start, 1000)
        return
    }

    db = new Database(client.db(dbName), 'links')
    console.log('DB CONNECTED')

    app.listen(80, () => {
        console.log("STARTED")
    })
}

function onClose() {
    client.close()
}

process.on('exit', onClose)
process.on('SIGINT', onClose)

start()
