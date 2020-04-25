import React from 'react'

import { Video } from '../../API/YouTubeApiOptions/VideosAPIOptions'
import { getRelativeTimeInString, Until } from '../../util/relativeTime'
import { getVideoTime } from '../../util/videoTime'

export const VideoList: React.FunctionComponent<{ items: Video[], useRelativeTime: boolean }> = ({ items, useRelativeTime }) =>{
    if (items.length) {
        return <div className={ 'VideoList' }>
            <ul>{
                items.map(item => (<li key={ item.id } className={ item.snippet?.channelId }>
                    <a
                        href={ `https://youtu.be/${item.id}` }
                        target='_blank'
                        rel='noopener'
                    >
                        <img src={ item.snippet?.thumbnails.high.url }></img>
                        <h3>{ item.snippet?.title }</h3>
                        <p>{ getRelativeTimeInString(
                                getVideoTime(item),
                                useRelativeTime ? Until.years : Until.seconds
                        ) }</p>
                    </a>
                </li>))
            }</ul>
        </div>
    } else {
        return <div className={ 'VideoList no-items' }><p>なし</p></div>
    }
}
