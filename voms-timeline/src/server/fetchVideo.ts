import { VideoAPIOptions, Video, isVideoAPIResponse } from '../API/YouTubeApiOptions/VideosAPIOptions'
import { fetch } from './fetch'
import { youtube as endpoints } from '../config/apiEndpoints'
import { dotenv } from './dotenv'
import { buildUrlQuery } from '../util/urlQueryBuilder'
import { SearchAPIOptions, isSearchAPIResponse, SearchAPIResponse } from '../API/YouTubeApiOptions/SearchAPIOptions'
import { channels } from '../config/channels'

export async function fetchVideo(videoIds: string[]): Promise<Video[]|undefined> {
    const options: VideoAPIOptions = {
        part: ['id', 'snippet', 'liveStreamingDetails' ],
        id: videoIds,
        key: dotenv.GOOGLE_API_KEY
    }
    const requestUrl = buildUrlQuery(endpoints.videos, {
        ...options,
        part: options.part.join(','),
        id: videoIds.join(',')
    })

    const res = await fetch(requestUrl)
    const json = await res.json()

    if (!isVideoAPIResponse(json)) {
        throw 'ERROR'
    }
    return json.items
}

export async function searchVideos(): Promise<string[]> {
    const channelIds = Object.entries(channels).map(it => it[1])
    const options: SearchAPIOptions[] = channelIds.map(id => ({
        part: [ 'id', 'snippet' ],
        channelId: id,
        maxResults: 10,
        order: 'date',
        type: 'video',
        key: dotenv.GOOGLE_API_KEY
    }))
    const requestUrls = options.map(option => ({
        ...option,
        part: option.part.join(',')
    })).map(option => buildUrlQuery(endpoints.search, option))
    const responses = await Promise.all(
        requestUrls.map(url => fetch(url).then(res => res.json()))
    )

    if (!responses.every(it => isSearchAPIResponse(it))) {
        console.log(responses)
        return []
    }

    const videoIds: string[] = []
    for (const res of responses as SearchAPIResponse[]) {
        const _videoIds = res.items.map(it => it.id?.videoId!!)
        videoIds.push(..._videoIds)
    }

    return videoIds
}
