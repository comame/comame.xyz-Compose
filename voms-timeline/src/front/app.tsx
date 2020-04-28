import React from 'react'
import { render } from 'react-dom'

import './index.html'
import './styles/style.scss'

import { firebaseConfig } from '../config/firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/messaging'

import { channels } from '../config/channels'

import { useChannelFilter } from './hooks/useChannelFilter'
import { useMenu } from './hooks/useMenu'

import { Header } from './components/header'
import { Menu } from './components/menu'
import { Timeline } from './components/timeline'
import { MenuCloser } from './components/menu-closer'

firebase.initializeApp(firebaseConfig)

function App() {
    const { filter, setFilter } = useChannelFilter(Object.keys(channels).map(name => (channels as any)[name]))
    const { isMenuOpen, toggleMenu } = useMenu(false)

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
            <Timeline filter={ filter } />
            <MenuCloser toggleMenu={ toggleMenu } />
        </div>
    </>
}

render(
    <App />,
    document.getElementById('root')
)
