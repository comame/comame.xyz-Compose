import { Thumbnails } from './Thumbnails'
import { DateString } from '../../util/DateString';

export interface VideoAPIOptions {
    part: Array<'id'|'snippet'|'contentDetails'|'liveStreamingDetails'|'player'|'status'>
    id: string
    maxResults?: number
    key?: string
}

export interface VideoAPIResponse {
    kind: 'youtube#videoListResponse'
    etag: string
    nextPageToken?: string
    prevPageToken?: string
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
        publishedAt: DateString
        channelId: string
        title: string
        description: string
        thumbnails: Thumbnails
        channelTitle: string
        liveBroadcastContent?: 'live'|'none'|'upcoming'
    }
    contentDetails?: {
        duration: string
    }
    player?: {
        embedHtml: string
    }
    liveStreamingDetails?: {
        actualStartTime?: DateString
        actualEndTime?: DateString
        scheduledStartTime?: DateString
    }
}

export function isVideoAPIResponse(arg: any): arg is VideoAPIResponse {
    return typeof arg == 'object' && arg.kind == 'youtube#videoListResponse'
}
