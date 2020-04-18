import { Thumbnails } from "./Thumbnails";

export interface VideoAPIOptions {
    part: Array<'id'|'snippet'|'contentDetails'|'liveStreamingDetails'|'player'|'status'>
    id: string | Array<string>
    maxResults: number
    key?: string
}

export interface VideoAPIResponse {
    kind: 'youtube#videoListResponse'
    etag: 'string'
    nextPageToken: string
    prevPageToken: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    }
    items: Video[]
}

export interface Video {
    kind: 'youtube#video'
    etag: string
    id: string
    snippet?: {
        publishedAt: Date
        channelId: string
        title: string
        description: string
        thumbnails: Thumbnails
        channelTitle: string
    }
    contentDetails?: {
        duration: string
    }
    player?: {
        embedHtml: string
    }
    liveStreamingDetails?: {
        actualStartTime: Date
        scheduledStartTime: Date
    }
}
