import express from 'express'
import mongodb from 'mongodb'
import { parse as parseXml, validate as validateXml } from 'fast-xml-parser'
import path from 'path'

const MongoClient = mongodb.MongoClient

const app = express()
let db: mongodb.Db

// Parse body as string
app.use((req, res, next) => {
    let bodyText = ''
    req.on('data', (chunk: Buffer|string) => {
        if (typeof chunk == 'string') {
            bodyText += chunk
        } else {
            bodyText += chunk.toString('utf8')
        }
    })
    req.on('end', () => {
        req.body = bodyText
        next()
    })
})

app.get('**', express.static(path.resolve(__dirname, '../front')))
app.all('/sub/hook', async (req, res) => {
    const queryObj = Object.fromEntries(req.originalUrl.split('?')[1]?.split('&').map(it => it.split('=')) ?? [])

    const logRequest = async ( { queryObj, subscribeObject }: { queryObj?: object, subscribeObject?: object }) => {
        await db.collection('subs-log').insertOne({ time: Date.now(), req: {
            url: req.originalUrl,
            query: Object.fromEntries(Object.entries(queryObj ?? {}).map(it => {
                return [ (it[0] as string).replace(/\./g, '_'), it[1] ]
            })),
            method: req.method,
            body: subscribeObject,
            headers: req.headers,
        } })
    }

    if (queryObj['hub.mode'] == 'subscribe') {
        const challenge = queryObj['hub.challenge']
        // res.send(challenge)
        console.log('challenge', challenge); res.sendStatus(404)
        await logRequest({ queryObj })
        return
    } else if (queryObj['hub.mode'] == 'unsubscribe') {
        res.sendStatus(404)
        return
    } else if (queryObj['hub.mode'] == 'denied') {
        await logRequest({ queryObj })
        res.send()
        return
    }

    if (validateXml(req.body) !== true) {
        const error = validateXml(req.body)
        console.error('VALIDATE ERROR', error)
        res.status(500).send('error')
        return
    }

    const subscribeObject = parseXml(req.body)

    const updatedVideoId = subscribeObject.entry?.['yt:videoId'] as string | undefined
    console.log('UpdatedVideoId', updatedVideoId)

    await logRequest({ subscribeObject })

    res.send('ok')
})

app.get('/sub/logs', async (req, res) => {
    const data = await db.collection('subs-log').find().sort({ time: -1 }).limit(100).toArray()
    res.send(JSON.stringify(data, void 0, 2))
})

MongoClient.connect('mongodb://mongo:27017', { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err
    db = client.db('voms-timeline')

    app.listen(80, () => {
        console.log('LISTEN')
    })
})
