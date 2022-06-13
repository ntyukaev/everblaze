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
  const [objectState, setObjectState] = useState({
    height: props.size.x,
    width: props.size.y,
    x: props.defaultPosition.x,
    y: props.defaultPosition.y,
    lastResizingPosX: null,
    lastResizingPosY: null,
    dragDiffX: null,
    dragDiffY: null,
    resizingDirections: []
  })

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
    setObjectState(prevObjectState => {
      return {
        ...prevObjectState,
        lastResizingPosX: e.clientX,
        lastResizingPosY: e.clientY,
        resizingDirections: Array.from(e.target.classList)
      }
    })
  }

  const handleMouseMoveResizing = (e) => {
    e.preventDefault()
    const lastResizingPosX = e.clientX
    const lastResizingPosY = e.clientY
    const diffX = lastResizingPosX - objectState.lastResizingPosX
    const diffY = lastResizingPosY - objectState.lastResizingPosY
    let width = objectState.width
    let height = objectState.height
    let x = objectState.x
    let y = objectState.y
    let directions = objectState.resizingDirections

    if (directions.includes('left')) {
      x += diffX
      width -= diffX
    }
    else if (directions.includes('right')) {
      width += diffX
    }
    if (directions.includes('top')) {
      y += diffY
      height -= diffY
    }
    else if (directions.includes('bottom')) {
      height += diffY
    }
    x = snapTo(x, props.grid.x)
    y = snapTo(y, props.grid.y)
    width = snapTo(Math.min(props.maxSize.x, Math.max(width, props.minSize.x)), props.grid.x)
    height = snapTo(Math.min(props.maxSize.y, Math.max(height, props.minSize.y)), props.grid.y)
    setObjectState(prevData => {
      if (width === snapTo(props.minSize.x, props.grid.x) || width === snapTo(props.maxSize.x, props.grid.x)) {
        x = prevData.x
      }
      if (height === snapTo(props.minSize.y, props.grid.y) || height === snapTo(props.maxSize.y, props.grid.y)) {
        y = prevData.y
      }
      return { ...prevData, width, height, x, y, lastResizingPosX, lastResizingPosY }
    })
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
    setObjectState(prevObjectState => {
      return {
        ...prevObjectState,
        dragDiffX: clientX - prevObjectState.x,
        dragDiffY: clientY - prevObjectState.y
      }
    })
    setIsDragging(true)
  }

  const handleMouseMoveDragging = (e) => {
    e.preventDefault()
    setObjectState(prevObjectState => {
      return {
        ...prevObjectState,
        x: snapTo(e.clientX - prevObjectState.dragDiffX, props.grid.x),
        y: snapTo(e.clientY - prevObjectState.dragDiffY, props.grid.y)
      }
    })
  }

  const handleMouseUpDragging = () => {
    window.removeEventListener('mousemove', handleMouseMoveDragging)
    window.removeEventListener('mouseup', handleMouseUpDragging)
    setIsDragging(false)
  }

  return (
    <DraggableContainer
      width={objectState.width}
      height={objectState.height}
      onMouseDown={handleMouseDownDragging}
      x={objectState.x}
      y={objectState.y}
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
  minSize: { x: 40, y: 40 },
  maxSize: { x: 160, y: 160 },
  bounds: { left: 0, top: 0, right: 0, bottom: 0 }
}

export default Draggable
