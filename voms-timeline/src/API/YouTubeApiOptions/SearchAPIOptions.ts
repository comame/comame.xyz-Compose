import { Thumbnails } from './Thumbnails'
import { DateString } from '../../util/DateString';

export interface SearchAPIOptions {
    part: Array<'id'|'snippet'>
    channelId?: string
    eventType?: 'completed'|'live'|'upcoming'
    maxResults?: number
    order?: 'date'|'rating'|'relevance'
    type?: 'video'
    key?: string
}

export interface SearchAPIResponse {
    kind: 'youtube#searchListResponse'
    etag: string
    nextPageToken: string
    prevPageToken: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    }
    items: SearchResult[]
}

export function isSearchAPIResponse(arg: any): arg is SearchAPIResponse {
    return typeof arg == 'object' && arg.kind == 'youtube#searchListResponse'
}

export interface SearchResult {
    kind: 'youtube#searchResult'
    etag: string
    id?: {
        kind: string
        videoId?: string
    }
    snippet?: {
        publishedAt: DateString
        channelId: string
        title: string
        description: string
        thumbnails: Thumbnails
    }
    channelTitle: string
}
