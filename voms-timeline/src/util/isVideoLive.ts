import { Video } from "../API/YouTubeApiOptions/VideosAPIOptions";

export function isVideoLive(video: Video): boolean {
    if (
        video.snippet?.liveBroadcastContent == 'live' &&
        video.liveStreamingDetails?.actualEndTime
    ) return true

    if (
        video.snippet?.liveBroadcastContent == 'upcoming' &&
        new Date(video.liveStreamingDetails?.scheduledStartTime!!).getTime() <= new Date().getTime()
    ) return true

    return false
}
