import { useState, useEffect } from 'react'
import { Video } from '../../API/YouTubeApiOptions/VideosAPIOptions'

export function useFetchUpcomingStreams(): {
    videos: Video[],
    updateUpcomingStreams: () => void,
    isFetching: boolean
} {
    const [ videos, setVideos ] = useState<Video[]>([])
    const [ willFetch, setWillFetch ] = useState<boolean>(true)
    const [ isFetching, setIsFetching ] = useState<boolean>(false)

    const fetchUpcomingStreams = async () => {
        setIsFetching(true)
        const videos: Video[] = await Promise.resolve([{
            kind: 'youtube#video',
            etag: new Date().getTime() + '',
            id: 'id'
        }])
        await new Promise(resolve => setTimeout(resolve, 1000))
        setVideos([ ...videos ])
        setIsFetching(false)
    }

    useEffect(() => {
        fetchUpcomingStreams()
    }, [ willFetch ])

    const updateUpcomingStreams = () => {
        setWillFetch(prev => !prev)
    }

    return { videos, updateUpcomingStreams, isFetching }
}
