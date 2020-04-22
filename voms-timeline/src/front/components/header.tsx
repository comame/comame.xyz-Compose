import React from 'react'
import { Clock } from './clock'

import '../assets/menu.svg'
import '../assets/checkbox.svg'
import '../assets/checkbox_blank.svg'


export const Header: React.FunctionComponent<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
    return <header className='Header'>
        <div id='menu-hamburger' onClick={ toggleMenu }><img src='./menu.svg'/></div>
        <Clock />
    </header>
}
