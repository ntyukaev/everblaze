import { useState, useEffect } from "react"
import styled from 'styled-components'
import './Draggable.css'

const Container = styled.div.attrs(({ x, y, width, height }) => ({
  style: {
    transform: `translate(${x}px, ${y}px)`,
    width: width,
    height: height
  }
}))`
  cursor: grab;
  ${props =>
    props.dragging && `
      opacity: 0.8;
      cursor: grabbing;
    `
  }
  display: inline-block;
  position: relative;
`

const Draggable = (props) => {
  const [size, setSize] = useState({ width: 100, height: 100 })
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })

  const [translate, setTranslate] = useState({
    x: 0,
    y: 0
  })

  const [diff, setDiff] = useState({
    x: 0,
    y: 0
  })

  const [resizingClick, setResizingClick] = useState(null)

  const handleMouseUpDragging = ({ clientX, clientY }) => {
    window.removeEventListener('mousemove', handleMouseMoveDragging)
    window.removeEventListener('mouseup', handleMouseUpDragging)
    setPosition({
      x: clientX - diff.x,
      y: clientY - diff.y,
    })
    setDragging(false)
  }

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMoveDragging)
      window.addEventListener('mouseup', handleMouseUpDragging)
    }
  }, [dragging])

  useEffect(() => {
    if (resizing) {
      window.addEventListener('mousemove', handleMouseMoveResizing)
      window.addEventListener('mouseup', handleMouseUpResizing)
    }
  }, [resizing])

  const round = (p, n) => {
    return p % n < n / 2 ? p - (p % n) : p + n - (p % n)
  }

  const handleMouseMoveDragging = ({ clientX, clientY }) => {
    setTranslate({
      x: round(clientX - diff.x, props.cellSize),
      y: round(clientY - diff.y, props.cellSize)
    })
  }

  const handleMouseDownDragging = ({ clientX, clientY }) => {
    setDiff({ x: clientX - position.x, y: clientY - position.y })
    setDragging(true)
  }

  const handleMouseDownResizing = (e) => {
    e.stopPropagation()
    setResizing(true)
    setResizingClick({ x: e.clientX, y: e.clientY, directions: Array.from(e.target.classList) })
  }

  const handleMouseMoveResizing = ({clientX, clientY}) => {
    const diffX = clientX - resizingClick.x
    const diffY = clientY - resizingClick.y
    let {width, height} = size
    if (resizingClick.directions.includes('left') || resizingClick.directions.includes('right')) {
      width += diffX
    }
    if (resizingClick.directions.includes('top') || resizingClick.directions.includes('bottom')) {
      height += diffY
    }
    width = round(width, props.cellSize)
    height = round(height, props.cellSize)
    setSize({width, height})
    setResizingClick({ ...resizingClick, x: clientX, y: clientY })
  }

  const handleMouseUpResizing = () => {
    window.removeEventListener('mousemove', handleMouseMoveResizing)
    window.removeEventListener('mouseup', handleMouseUpResizing)
    setResizingClick(null)
    setResizing(false)
  }

  return (
    <Container
      width={size.width}
      height={size.height}
      onMouseDown={handleMouseDownDragging}
      x={translate.x}
      y={translate.y}
      dragging={dragging}
      className="draggable">
      <div className='resizers' onMouseDown={handleMouseDownResizing}>
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
    </Container>
  )
}


export default Draggable
