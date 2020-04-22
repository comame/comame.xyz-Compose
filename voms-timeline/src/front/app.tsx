import React from 'react'
import { render } from 'react-dom'

import './index.html'
import './styles/style.scss'

import { channels } from '../config/channels'

import { useChannelFilter } from './hooks/useChannelFilter'
import { useMenu } from './hooks/useMenu'

import { Header } from './components/header'
import { Menu } from './components/menu'

function App() {
    const { filter, setFilter } = useChannelFilter(Object.keys(channels).map(name => (channels as any)[name]))
    const { isMenuOpen, toggleMenu } = useMenu()

    const contentsClassList: string[] = [
        'Contents',
        isMenuOpen ? 'isMenuOpen' : ''
    ]

    return <>
        <Header
            toggleMenu={ toggleMenu }
        />
        <div className={ contentsClassList.join(' ') }>
            <Menu
                channelFilter={ filter }
                setChannelFilter={ setFilter }
            />
            <div><div style={{ height: 150 + 'vh'}}>Placeholder Content</div></div>
        </div>
    </>
}

render(
    <App />,
    document.getElementById('root')
)
