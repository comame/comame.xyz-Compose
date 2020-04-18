import { Thumbnails } from './Thumbnails'

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
    items: SearchResult
}

export interface SearchResult {
    kind: 'youtube#searchResult'
    etag: string
    id?: {
        kind: string
        videoId?: string
    }
    snippet?: {
        publishedAt: Date
        channelId: string
        title: string
        description: string
        thumbnails: Thumbnails
    }
    channelTitle: string
}
