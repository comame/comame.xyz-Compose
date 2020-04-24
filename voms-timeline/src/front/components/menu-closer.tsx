import React from 'react'

export const MenuCloser: React.FunctionComponent<{
    toggleMenu: () => void
}> = ({ toggleMenu }) => {
    return <div
        className='MenuCloser'
        onClickCapture={ toggleMenu }
    />
}
