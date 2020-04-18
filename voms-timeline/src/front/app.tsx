import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'

import { fetch } from '../util/fetch'

import './index.html'

function Fetch() {
    const [ fetched, setFetched ] = useState('')
    useEffect(() => {
        const getResponse = async () => {
            const res = await fetch('./app.js')
            const txt = await res.text()
            setFetched(txt)
        }
        getResponse()
    })

    return <div>{ fetched }</div>
}

render(
    <Fetch />,
    document.getElementById('root')
)
