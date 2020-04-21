import React, { useState, useEffect } from 'react'

import '../assets/clock.svg'

export function Clock() {
    const [ unixSecond, setUnixSecond ] = useState<number>(
        Math.floor(new Date().getTime() / 1000)
    )
    useEffect(() => {
        const cancelId = setInterval(() => {
            const current = Math.floor(new Date().getTime() / 1000)
            setUnixSecond(current)
        }, 100)
        return () => {
            clearInterval(cancelId)
        }
    }, [])

    const currentDate = new Date(unixSecond * 1000)

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const date = currentDate.getDate()
    const day = ['日', '月', '火', '水', '木', '金', '土'][currentDate.getDay()]
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()

    const hoursStr = hours < 10 ? '0' + hours : hours
    const minutesStr = minutes < 10 ? '0' + minutes : minutes
    const secondsStr = seconds < 10 ? '0' + seconds : seconds

    return <div className='Clock'>
        <img src='./clock.svg' />
        <time dateTime={ currentDate.toISOString()}>{
            `${year}.${month}.${date}(${day}) ${hoursStr}:${minutesStr}:${secondsStr}`
        }</time>
    </div>
}
