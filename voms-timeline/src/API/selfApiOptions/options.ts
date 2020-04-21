import { Video } from '../YouTubeApiOptions/VideosAPIOptions'

export interface UpcomingStreamsOptions {
    channelId: string
}

export function isUpcomingStreamsOptions(arg: any): arg is UpcomingStreamsOptions {
    return (
        typeof arg == 'object' &&
        typeof arg.channelId == 'string'
    )
}

export interface UpcomingStreamsResponse {
    kind: 'voms-timeline.comame.xyz#upcomingStreamsResponse'
    channelId: string
    items: Video[]
}

export function isUpComingStream(arg: any): arg is UpcomingStreamsResponse {
    return typeof arg == 'object' && arg.kind == 'voms-timeline.comame.xyz#upcomingStreamsResponse'
}

export interface CompletedStreamsOptions {
    channelId: string
}

export function isCompletedStreamsOptions(arg: any): arg is CompletedStreamsOptions {
    return (
        typeof arg == 'object' &&
        typeof arg.channelId == 'string'
    )
}


export interface CompletedStreamsResponse {
    kind: 'voms-timeline.comame.xyz#completedStreamsResponse'
    channelId: string
    items: Video[]
}

export function isCompletedStreams(arg: any): arg is CompletedStreamsResponse {
    return typeof arg == 'object' && arg.kind == 'voms-timeline.comame.xyz#completeStreamsResponses'
}
