import React from 'react'
import { useFetchVideos } from '../hooks/useAPI'
import { VideoList } from './videolist'
import { ChannelFilter } from '../hooks/useChannelFilter'
import { Video } from '../../API/YouTubeApiOptions/VideosAPIOptions'

export const Timeline: React.FunctionComponent<{
    filter: ChannelFilter
}> = ({ filter }) => {
    const { videos } = useFetchVideos()

    const channelFilterFunc = (video: Video) => {
        const channelId = video.snippet?.channelId
        const enable = filter.find(it => it.id == channelId)?.enable
        return enable
    }

    const upcomingStreams = videos.filter(video =>
        video.snippet?.liveBroadcastContent == 'upcoming'
    ).filter(channelFilterFunc)

    const uploads = videos.filter(video =>
        video.snippet?.liveBroadcastContent == ('none' || void 0)
    ).filter(channelFilterFunc)

    return <div className='Timeline'>
        <h2>Upcoming live streams</h2>
        <VideoList items={ upcomingStreams } />
        <h2>Uploads</h2>
        <VideoList items={ uploads } />
    </div>
}
