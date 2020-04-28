import { Db, Collection } from 'mongodb'
import { Video } from "../API/YouTubeApiOptions/VideosAPIOptions";
import { getVideoTime } from '../util/videoTime';

interface CacheMeta {
    lastUpdated: number
}

interface VideoCache {
    _id: Video['id'],
    time: number,
    item: Video
}

export async function cacheResponse(db: Db, videos: Video[]) {
    const metadataCollection: Collection<CacheMeta> = db.collection('metadata')
    await metadataCollection.updateOne({}, {
        lastUpdated: new Date().getTime()
    }, {
        upsert: true
    })

    const videosCollection: Collection<VideoCache> = db.collection('videos')
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

export async function getCached(db: Db, limit: number = 50): Promise<{
    lastUpdated: number|undefined,
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
    const lastUpdated = cacheMetadata?.lastUpdated

    return { lastUpdated, videos }
}
