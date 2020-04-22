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
        const video: Video = {
            "kind": "youtube#video",
            "etag": "\"nxOHAKTVB7baOKsQgTtJIyGxcs8/mpQxSHTQNtcPkeiCZfkHGPNmmbg\"",
            "id": "gWrScbWO79M",
            "snippet": {
             "publishedAt": new Date("2020-04-09T05:53:37.000Z"),
             "channelId": "UC3vzVK_N_SUVKqbX69L_X4g",
             "title": "【フリーチャット】雑魚のたまり場【VOMS/緋笠トモシカ】",
             "description": "はじめまして！\nVOX MONSTERS、略してVOMSの緋笠トモシカです！\n\n暇なときの雑談等にみんなで仲良く利用してね\n誰でも閲覧可能な場所ということを忘れず、モラルやマナーを守って自由に楽しもう！\n暴言、喧嘩、ほかの方に迷惑をかけたりするようなことはやめよう！\n\nたまにトモシカものぞきに来るのだ\n\n\n▽ツイッター\nhttps://twitter.com/Tomoshika_H",
             "thumbnails": {
              "default": {
               "url": "https://i.ytimg.com/vi/gWrScbWO79M/default_live.jpg",
               "width": 120,
               "height": 90
              },
              "medium": {
               "url": "https://i.ytimg.com/vi/gWrScbWO79M/mqdefault_live.jpg",
               "width": 320,
               "height": 180
              },
              "high": {
               "url": "https://i.ytimg.com/vi/gWrScbWO79M/hqdefault_live.jpg",
               "width": 480,
               "height": 360
              },
              "standard": {
               "url": "https://i.ytimg.com/vi/gWrScbWO79M/sddefault_live.jpg",
               "width": 640,
               "height": 480
              },
              "maxres": {
               "url": "https://i.ytimg.com/vi/gWrScbWO79M/maxresdefault_live.jpg",
               "width": 1280,
               "height": 720
              }
             },
             "channelTitle": "緋笠トモシカ - Tomoshika Hikasa -",
            },
            "player": {
             "embedHtml": "\u003ciframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/gWrScbWO79M\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e"
            },
            "liveStreamingDetails": {
             "scheduledStartTime": new Date("2023-04-09T05:45:00.000Z"),
            }
           }
        const videos: Video[] = await Promise.resolve([
            video, video, video, video, video
        ])
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
