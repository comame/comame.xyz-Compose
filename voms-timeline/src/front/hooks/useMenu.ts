import { useState } from 'react'

export function useMenu(openByDefault = false): {
    isMenuOpen: boolean,
    toggleMenu: () => void
} {
    const [ isOpen, setIsOpen ] = useState(openByDefault)
    const toggle = () => {
        setIsOpen(prev => !prev)
    }

    return {
        isMenuOpen: isOpen, toggleMenu: toggle
    }
}
