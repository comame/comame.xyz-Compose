import { Video } from '../YouTubeApiOptions/VideosAPIOptions'
import { DateString } from '../../util/DateString'

export interface VideosResponse {
    kind: 'voms-timeline.comame.xyz#videosResponse'
    items: Video[]
    lastUpdated: DateString
}

export function isVideosResponse(arg: any): arg is VideosResponse {
    return typeof arg == 'object' && arg.kind == 'voms-timeline.comame.xyz#videosResponse'
}
