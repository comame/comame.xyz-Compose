import React from 'react'
import { useFetchVideos } from '../hooks/useAPI'
import { VideoList } from './videolist'
import { ChannelFilter } from '../hooks/useChannelFilter'
import { Video } from '../../API/YouTubeApiOptions/VideosAPIOptions'
import { getVideoTime } from '../../util/videoTime'
import { isVideoLive } from '../../util/isVideoLive'

export const Timeline: React.FunctionComponent<{
    filter: ChannelFilter
}> = ({ filter }) => {
    const { videos } = useFetchVideos()

    const channelFilterFunc = (video: Video) => {
        const channelId = video.snippet?.channelId
        const enable = filter.find(it => it.id == channelId)?.enable
        return enable
    }

    const sortByDateFunc = (a: Video, b: Video) => {
        return getVideoTime(b).getTime() - getVideoTime(a).getTime()
    }

    const liveStreams = videos.filter(isVideoLive)

    const upcomingStreams = videos.filter(video =>
        video.snippet?.liveBroadcastContent == 'upcoming'
    ).filter(channelFilterFunc).sort(sortByDateFunc)

    const uploads = videos.filter(video =>
        video.snippet?.liveBroadcastContent == ('none' || void 0)
    ).filter(channelFilterFunc).sort(sortByDateFunc)

    return <div className='Timeline'>
        <h2>配信中</h2>
        <VideoList items={ liveStreams } useRelativeTime={ true } />
        <h2>今後のライブストリーム</h2>
        <VideoList items={ upcomingStreams } useRelativeTime={ false }/>
        <h2>アップロード動画</h2>
        <VideoList items={ uploads } useRelativeTime={ true } />
    </div>
}
