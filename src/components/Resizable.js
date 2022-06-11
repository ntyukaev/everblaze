import { useEffect, useState } from 'react'
import './Resizable.css'

const Resizable = (props) => {
    const [size, setSize] = useState({ width: 100, height: 100 })
    const [resizing, setResizing] = useState(false)
    const [origin, setOrigin] = useState(null)

    const handleMouseDown = (e) => {
        e.stopPropagation()
        setOrigin({ x: e.clientX, y: e.clientY, directions: Array.from(e.target.classList) })
        setResizing(true)
    }

    const handleMouseMove = ({ clientX, clientY }) => {
        const diffX = clientX - origin.x
        const diffY = clientY - origin.y
        let {width, height} = size
        if (origin.directions.includes('left') || origin.directions.includes('right')) {
            width += diffX
        }
        if (origin.directions.includes('top') || origin.directions.includes('bottom')) {
            height += diffY
        }
        setSize({width, height})
        setOrigin({ ...origin, x: clientX, y: clientY })
    }

    const handleMouseUp = () => {
        console.log('mouse up')
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        setResizing(false)
        setOrigin(null)
    }

    useEffect(() => {
        if (resizing) {
            console.log('origin')
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        }
    }, [resizing])

    return (
        <div style={{ width: `${size.width}px`, height: `${size.height}px` }} className='resizable'>
            <div className='resizers' onMouseDown={handleMouseDown}>
                <div className='lines'>
                    <div className='resizer left'></div>
                    <div className='resizer top'></div>
                    <div className='resizer right'></div>
                    <div className='resizer bottom'></div>
                </div>
                <div className='angles'>
                    <div className='resizer top left'></div>
                    <div className='resizer top right'></div>
                    <div className='resizer bottom left'></div>
                    <div className='resizer bottom right'></div>
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default Resizable
