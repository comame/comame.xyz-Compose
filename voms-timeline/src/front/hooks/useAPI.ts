import { useState, useEffect } from 'react'
import { Video } from '../../API/YouTubeApiOptions/VideosAPIOptions'
import { self as endpoints } from '../../config/apiEndpoints'
import { isVideosResponse } from '../../API/selfApiOptions/options'

export function useFetchVideos(): {
    videos: Video[],
    updateVideos: () => void,
    isFetching: boolean
} {
    const [ videos, setVideos ] = useState<Video[]>([])
    const [ willFetch, setWillFetch ] = useState<boolean>(true)
    const [ isFetching, setIsFetching ] = useState<boolean>(false)

    const fetchUpcomingStreams = async () => {
        setIsFetching(true)
        const res = await fetch(endpoints.videos)
        const videosResponse: {} = await res.json()

        if (!isVideosResponse(videosResponse)) {
            // TODO: Error handle
            setIsFetching(false)
            return
        }
        const videos = videosResponse.items

        setVideos([ ...videos ])
        setIsFetching(false)
    }

    useEffect(() => {
        fetchUpcomingStreams()
    }, [ willFetch ])

    const updateUpcomingStreams = () => {
        setWillFetch(prev => !prev)
    }

    return { videos, updateVideos: updateUpcomingStreams, isFetching }
}
