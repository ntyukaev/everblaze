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

  const [dragState, setDragState] = useState({
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    translateX: 0,
    translateY: 0,
    diffX: 0,
    diffY: 0,
    resizingClickX: 0,
    resizingClickY: 0,
    directions: []
  })

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
    setDragState({
      ...dragState,
      resizingClickX: e.clientX,
      resizingClickY: e.clientY,
      directions: Array.from(e.target.classList)
    })
  }

  const handleMouseMoveResizing = (e) => {
    e.preventDefault()
    console.log('handleMouseMoveResizing')
    const resizingClickX = e.clientX
    const resizingClickY = e.clientY
    const diffX = resizingClickX - dragState.resizingClickX
    const diffY = resizingClickY - dragState.resizingClickY
    let width = dragState.width
    let height = dragState.height
    let translateX = dragState.translateX
    let translateY = dragState.translateY
    if (dragState.directions.includes('left')) {
      translateX += diffX
      width -= diffX
    }
    else if (dragState.directions.includes('right')) {
      width += diffX
    }
    if (dragState.directions.includes('top')) {
      translateY += diffY
      height -= diffY
    }
    else if (dragState.directions.includes('bottom')) {
      height += diffY
    }
    translateX = round(translateX, props.cellSize)
    translateY = round(translateY, props.cellSize)
    height = round(height, props.cellSize)
    width = round(width, props.cellSize)

    setDragState({
      ...dragState,
      width,
      height,
      translateX,
      translateY,
      resizingClickX,
      resizingClickY
    })
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

  const handleMouseDownDragging = ({clientX, clientY}) => {
    setDragState({
      ...dragState,
      diffX: clientX - dragState.x,
      diffY: clientY - dragState.y
    })
    setIsDragging(true)
  }

  const handleMouseMoveDragging = ({clientX, clientY}) => {
    setDragState({
      ...dragState,
      translateX: round(clientX - dragState.diffX, props.cellSize),
      translateY: round(clientY - dragState.diffY, props.cellSize)
    })
  }

  const handleMouseUpDragging = ({clientX, clientY}) => {
    window.removeEventListener('mousemove', handleMouseMoveDragging)
    window.removeEventListener('mouseup', handleMouseUpDragging)
    // setDragState({
    //   ...dragState,
    //   x: clientX - dragState.diffX,
    //   y: clientY - dragState.diffY
    // })
    setIsDragging(false)
  }

  return (
    <Container
      width={dragState.width}
      height={dragState.height}
      onMouseDown={handleMouseDownDragging}
      x={dragState.translateX}
      y={dragState.translateY}
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
