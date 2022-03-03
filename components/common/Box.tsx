import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode,
    onClick: () => void,
    pointer?: boolean
}

const Box = ({ children, onClick, pointer = false }: Props) => {
    return (
        <div className={`border px-5 py-3 ${pointer ? 'cursor-pointer' : ''}`} onClick={onClick}>
            {children}
        </div>
    )
}

export default Box