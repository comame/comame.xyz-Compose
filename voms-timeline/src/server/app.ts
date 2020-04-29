import path from 'path'
import express, { Response } from 'express'
import { MongoClient, Db } from 'mongodb'
import { websubExpressHandler } from './websubExpressHandler'
import { fetchVideo } from './fetchVideo'
import { cacheResponse, getCached } from './cache'
import { VideosResponse } from '../API/selfApiOptions/options'

const app = express()
let db: Db

// Parse body as string
// @ts-ignore: res unused
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
    const videoId = await websubExpressHandler(req, res, db)
    if (!videoId) return
    const video = await fetchVideo(videoId)
    if (!video) return

    await cacheResponse(db, [ video ])
})

// @ts-ignore: req unused
app.get('/sub/logs', async (req, res) => {
    const data = await db.collection('subs-log').find().sort({ time: -1 }).limit(100).toArray()
    res.send(JSON.stringify(data, void 0, 2))
})

// @ts-ignore: req unused
app.get('/api/videos', async (req, res: Response<VideosResponse>) => {
    const { videos, lastUpdated } = await getCached(db)
    res.send({
        kind: 'voms-timeline.comame.xyz#videosResponse',
        items: videos,
        lastUpdated: new Date(lastUpdated).toISOString()
    })
})

MongoClient.connect('mongodb://mongo:27017', { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err
    db = client.db('voms-timeline')

    app.listen(80, () => {
        console.log('LISTEN')
    })
})
