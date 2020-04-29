import { Db, Collection } from 'mongodb'
import { Video } from "../API/YouTubeApiOptions/VideosAPIOptions";
import { getVideoTime } from '../util/videoTime';

interface CacheMeta {
    lastUpdated: number
}

interface VideoCache {
    _id: Video['id'],
    time: number,
    item: Video,
    update: number
}

export async function cacheResponse(db: Db, videos: Video[]) {
    const metadataCollection: Collection<CacheMeta> = db.collection('metadata')
    await metadataCollection.updateOne({}, {
        '$set': {
            lastUpdated: new Date().getTime()
        }
    }, {
        upsert: true
    })

    const videosCollection: Collection<VideoCache> = db.collection('videos')
    await Promise.all(videos.map(video => videosCollection.updateOne({
        _id: video.id
    }, {
        '$set': {
            _id: video.id,
            time: getVideoTime(video).getTime(),
            item: video,
            update: Date.now()
        }
    }, {
        upsert: true
    })))
}

export async function getCached(db: Db, limit: number = 50): Promise<{
    lastUpdated: number,
    videos: Video[]
}> {
    const metadataCollection: Collection<CacheMeta> = db.collection('metadata')
    const videosCollection: Collection<VideoCache> = db.collection('videos')

    const cacheMetadata = await metadataCollection.findOne({})
    const videoCaches = await videosCollection.find()
        .sort('time', -1)
        .limit(limit)
        .toArray()

    const videos = videoCaches.map(it => it.item)
    const lastUpdated = cacheMetadata?.lastUpdated ?? Date.now()

    return { lastUpdated, videos }
}
