import React from 'react'
import { render } from 'react-dom'

import './index.html'
import './styles/style.scss'

import { Clock } from './components/clock'

render(
    <Clock />,
    document.getElementById('root')
)
