import { VideoAPIOptions, Video, isVideoAPIResponse } from '../API/YouTubeApiOptions/VideosAPIOptions'
import { fetch } from './fetch'
import { youtube as endpoints } from '../config/apiEndpoints'
import { dotenv } from './dotenv'
import { buildUrlQuery } from '../util/urlQueryBuilder'

export async function fetchVideo(videoId: string): Promise<Video|undefined> {
    const options: VideoAPIOptions = {
        part: ['id', 'snippet', 'liveStreamingDetails' ],
        id: videoId,
        key: dotenv.GOOGLE_API_KEY
    }
    const requestUrl = buildUrlQuery(endpoints.videos, {
        ...options,
        part: options.part.join(',')
    })

    const res = await fetch(requestUrl)
    const json = await res.json()

    if (!isVideoAPIResponse(json)) {
        throw 'ERROR'
    }
    return json.items[0]
}
