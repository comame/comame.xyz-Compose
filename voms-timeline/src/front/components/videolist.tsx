import React from 'react'

import { Video } from '../../API/YouTubeApiOptions/VideosAPIOptions'

export const VideoList: React.FunctionComponent<{ items: Video[] }> = ({ items }) =>{
    if (items.length) {
        return <div className={ 'VideoList' }>
            <ul>{
                items.map(item => (<li key={ item.id }>
                    <a
                        href={ `https://youtu.be/${item.id}` }
                        target='_blank'
                        rel='noopener'
                    >
                        <img src={ item.snippet?.thumbnails.high.url }></img>
                        <h3>{ item.snippet?.title }</h3>
                        <p>{ item.liveStreamingDetails?.scheduledStartTime.toISOString() }</p>
                    </a>
                </li>))
            }</ul>
        </div>
    } else {
        return <div className={ 'VideoList no-items' }><p>No Items</p></div>
    }
}
