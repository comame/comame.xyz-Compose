import { Video } from "../API/YouTubeApiOptions/VideosAPIOptions";
import { asDate } from "./DateString";

export function getVideoTime(video: Video): Date {
    if (video.liveStreamingDetails?.actualEndTime) {
        return asDate(video.liveStreamingDetails.actualEndTime)
    }
    if (video.liveStreamingDetails?.scheduledStartTime) {
        return asDate(video.liveStreamingDetails.scheduledStartTime)
    } else {
        return asDate(video.snippet?.publishedAt!!)
    }
}
