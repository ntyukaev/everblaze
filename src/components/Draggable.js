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
    props.isDragging && `
      opacity: 0.8;
      cursor: grabbing;
    `
  }
  display: inline-block;
  position: relative;
`

const Draggable = (props) => {
  // const [size, setSize] = useState({ width: 100, height: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [size, setSize] = useState({ height: 100, width: 100 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [diff, setDiff] = useState({ x: 0, y: 0 })
  const [resizingClick, setResizingClick] = useState({x: 0, y: 0})
  const [directions, setDirections] = useState(null)

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMoveResizing)
      window.addEventListener('mouseup', handleMouseUpResizing)
    }
  }, [isResizing])

  const round = (p, n) => {
    return p % n < n / 2 ? p - (p % n) : p + n - (p % n)
  }

  const handleMouseDownResizing = (e) => {
    e.stopPropagation()
    setIsResizing(true)
    setResizingClick({x: e.clientX, y: e.clientY})
    setDirections(Array.from(e.target.classList))
  }

  const handleMouseMoveResizing = (e) => {
    e.preventDefault()
    const resizingClickX = e.clientX
    const resizingClickY = e.clientY
    const diffX = resizingClickX - resizingClick.x
    const diffY = resizingClickY - resizingClick.y
    let width = size.width
    let height = size.height
    let translateX = translate.x
    let translateY = translate.y
    if (directions.includes('left')) {
      translateX += diffX
      width -= diffX
    }
    else if (directions.includes('right')) {
      width += diffX
    }
    if (directions.includes('top')) {
      translateY += diffY
      height -= diffY
    }
    else if (directions.includes('bottom')) {
      height += diffY
    }
    translateX = round(translateX, props.cellSize)
    translateY = round(translateY, props.cellSize)
    height = round(height, props.cellSize)
    width = round(width, props.cellSize)
    setSize({width, height})
    setTranslate({x: translateX, y: translateY})
    setResizingClick({x: resizingClickX, y: resizingClickY})
  }

  const handleMouseUpResizing = () => {
    console.log('handle mouse up resizing')
    window.removeEventListener('mousemove', handleMouseMoveResizing)
    window.removeEventListener('mouseup', handleMouseUpResizing)
    setIsResizing(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMoveDragging)
      window.addEventListener('mouseup', handleMouseUpDragging)
    }
  }, [isDragging])

  const handleMouseDownDragging = ({ clientX, clientY }) => {
    setDiff({x: clientX - position.x, y: clientY - position.y})
    setIsDragging(true)
  }

  const handleMouseMoveDragging = ({ clientX, clientY }) => {
    setTranslate({
      x: round(clientX - diff.x, props.cellSize),
      y: round(clientY - diff.y, props.cellSize)
    })
  }

  const handleMouseUpDragging = ({ clientX, clientY }) => {
    window.removeEventListener('mousemove', handleMouseMoveDragging)
    window.removeEventListener('mouseup', handleMouseUpDragging)
    setPosition({
      x: round(clientX - diff.x, props.cellSize),
      y: round(clientY - diff.y, props.cellSize)
    })
    setIsDragging(false)
  }

  return (
    <Container
      width={size.width}
      height={size.height}
      onMouseDown={handleMouseDownDragging}
      x={translate.x}
      y={translate.y}
      isDragging={isDragging}
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
