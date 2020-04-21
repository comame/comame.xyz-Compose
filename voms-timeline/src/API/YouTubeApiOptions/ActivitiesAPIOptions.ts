import { Thumbnails } from './Thumbnails'

export interface ActivitiesAPIOptions {
    part: Array<'id'|'snippet'|'contentDetails'>
    channelId: string
    maxResults?: number
    key?: string
}

export interface ActivitiesAPIResponse {
    kind: 'youtube#activityListResponse'
    etag: string
    nextPageToken?: string
    prevPageToken?: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    }
    items: Activity[]
}

export function isActivitiesAPIResponse(arg: any): arg is ActivitiesAPIResponse {
    return typeof arg == 'object' && arg.kind == 'youtube#activityListResponse'
}

export interface Activity {
    kind: 'youtube#activity'
    etag: string
    id?: string
    snippet?: {
        publishedAt: Date
        channelId: string
        title: string
        description: string
        thumbnails: Thumbnails
        channelTitle: string
        type: 'upload'
    },
    contentDetails?: {
        upload: {
            videoId: string
        }
    }
}

export function isActivity(arg: Activity): arg is Activity {
    return typeof arg == 'object' && arg.kind == 'youtube#activity'
}
