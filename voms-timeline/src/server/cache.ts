import { Db } from 'mongodb'
import { Video } from "../API/YouTubeApiOptions/VideosAPIOptions";
import { getVideoTime } from '../util/videoTime';

export async function cacheResponse(db: Db, videos: Video[]) {
    const metadataCollection = db.collection('metadata')
    await metadataCollection.updateOne({}, {
        lastUpdated: new Date().getTime()
    }, {
        upsert: true
    })

    const videosCollection = db.collection('videos')
    await Promise.all(videos.map(video => videosCollection.updateOne({
        _id: video.id
    }, {
        _id: video.id,
        time: getVideoTime(video).getTime(),
        item: video
    }, {
        upsert: true
    })))
}

export async function getCached(db: Db): Promise<{
    lastUpdated: number,
    videos: Video[]
}> {
    const lastUpdated: number = (await db.collection('metadata').findOne({}))?.lastUpdated ?? new Date().getTime()
    const videos: Video[] = (await db.collection('videos').find().sort('time', -1).limit(100).toArray()).map(it => it.item)
    return { lastUpdated, videos }
}
