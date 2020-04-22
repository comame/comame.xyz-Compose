import { useState } from 'react'
import { channels } from '../../config/channels'

export type ChannelFilter = {
    id: string,
    name: string
    enable: boolean
}[]

export type ChannelFilterSetter = (filter: ChannelFilter) => void

export function useChannelFilter(channelIds: string[]): {
    filter: ChannelFilter,
    setFilter: ChannelFilterSetter
} {
    const defaultFilter: ChannelFilter = channelIds.map(id => ({
        id,
        enable: true,
        name: Object.keys(channels)
            .map(k => [ k, (channels as any)[k] ])
            .find(it => it[1] == id)!![0]
    }))
    const [ filter, setFilter ] = useState(defaultFilter)

    return { filter, setFilter }
}
