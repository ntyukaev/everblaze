import { useState, useEffect } from "react"
import styled from 'styled-components'
import './Draggable.css'

const DraggableContainer = styled.div.attrs(({ x, y, width, height }) => ({
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
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [size, setSize] = useState({ height: props.size.x, width: props.size.y })
  const [translate, setTranslate] = useState({ x: props.defaultPosition.x, y: props.defaultPosition.y })
  const [diff, setDiff] = useState({ x: 0, y: 0 })
  const [resizingClick, setResizingClick] = useState({ x: 0, y: 0 })
  const [directions, setDirections] = useState(null)

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMoveResizing)
      window.addEventListener('mouseup', handleMouseUpResizing)
    }
  }, [isResizing])

  const snapTo = (p, n) => {
    return p % n < n / 2 ? p - (p % n) : p + n - (p % n)
  }

  const handleMouseDownResizing = (e) => {
    e.stopPropagation()
    setIsResizing(true)
    setResizingClick({ x: e.clientX, y: e.clientY })
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
    translateX = snapTo(translateX, props.grid.x)
    translateY = snapTo(translateY, props.grid.y)
    width = snapTo(width, props.grid.x)
    height = snapTo(height, props.grid.y)
    setSize({ width, height })
    setTranslate({ x: translateX, y: translateY })
    setResizingClick({ x: resizingClickX, y: resizingClickY })
  }

  const handleMouseUpResizing = () => {
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
    setDiff({ x: clientX - translate.x, y: clientY - translate.y })
    setIsDragging(true)
  }

  const handleMouseMoveDragging = (e) => {
    e.preventDefault()
    setTranslate({
      x: snapTo(e.clientX - diff.x, props.grid.x),
      y: snapTo(e.clientY - diff.y, props.grid.y)
    })
  }

  const handleMouseUpDragging = () => {
    window.removeEventListener('mousemove', handleMouseMoveDragging)
    window.removeEventListener('mouseup', handleMouseUpDragging)
    setIsDragging(false)
  }

  return (
    <DraggableContainer
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
    </DraggableContainer>
  )
}

Draggable.defaultProps = {
  grid: { x: 20, y: 20 },
  defaultPosition: { x: 20, y: 40 },
  size: { x: 100, y: 100 },
  minSize: { x: 20, y: 20 },
  maxSize: { x: 150, y: 150 },
  bounds: { left: 0, top: 0, right: 0, bottom: 0 }
}

export default Draggable
