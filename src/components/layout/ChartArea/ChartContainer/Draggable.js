import { useState, useEffect } from "react"
import styled from 'styled-components'
import Resizable from "./Resizable"

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
  position: absolute;
  background: white;
`

const Draggable = (props) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [objectState, setObjectState] = useState({
    width: props.size.x,
    height: props.size.y,
    x: props.defaultPosition.x,
    y: props.defaultPosition.y,
    lastResizingPosX: null,
    lastResizingPosY: null,
    dragDiffX: null,
    dragDiffY: null,
    resizingDirections: []
  })

  useEffect(() => {
    setObjectState({
      ...objectState,
      width: props.size.x,
      height: props.size.y,
      x: props.defaultPosition.x,
      y: props.defaultPosition.y
    })
  }, [props.size.x, props.size.y, props.defaultPosition.x, props.defaultPosition.y])

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMoveResizing)
      window.addEventListener('mouseup', handleMouseUpResizing)
    }
  }, [isResizing])

  const handleMouseDownResizing = (e) => {
    if (props.onMouseDown) {
      props.onMouseDown()
    }
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
    if (props.onMouseMove) {
      props.onMouseMove(e)
    }
    const lastResizingPosX = e.clientX
    const lastResizingPosY = e.clientY
    const directions = objectState.resizingDirections
    const diffX = lastResizingPosX - objectState.lastResizingPosX
    const diffY = lastResizingPosY - objectState.lastResizingPosY
    let width = objectState.width
    let height = objectState.height
    let x = objectState.x
    let y = objectState.y

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

    setObjectState(prevObjectState => {
      width = Math.min(width, props.maxSize.x)
      width = Math.max(width, props.minSize.x)

      height = Math.min(height, props.maxSize.y)
      height = Math.max(height, props.minSize.y)

      if (width === prevObjectState.width) {
        x = prevObjectState.x
      }

      if (height === prevObjectState.height) {
        y = prevObjectState.y
      }

      if (prevObjectState.x === props.bounds.left && diffX < 0 && directions.includes('left')) {
        x = prevObjectState.x
        width = prevObjectState.width
      }

      if (prevObjectState.x === props.bounds.right - prevObjectState.width && diffX > 0 && directions.includes('right')) {
        x = prevObjectState.x
        width = prevObjectState.width
      }

      if (prevObjectState.y === props.bounds.top && diffY < 0 && directions.includes('top')) {
        y = prevObjectState.y
        height = prevObjectState.height
      }

      if (prevObjectState.y === Math.round(props.bounds.bottom - prevObjectState.height) && diffY > 0 && directions.includes('bottom')) {
        y = prevObjectState.y
        height = prevObjectState.height
      }

      return {
        ...prevObjectState,
        x,
        y,
        width,
        height
      }
    })
  }

  const handleMouseUpResizing = (e) => {
    window.removeEventListener('mousemove', handleMouseMoveResizing)
    window.removeEventListener('mouseup', handleMouseUpResizing)
    setIsResizing(false)
    if (props.onMouseUp) {
      props.onMouseUp(e)
    }
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMoveDragging)
      window.addEventListener('mouseup', handleMouseUpDragging)
    }
  }, [isDragging])

  const handleMouseDownDragging = ({ clientX, clientY }) => {
    if (props.onMouseDown) {
      props.onMouseDown()
    }
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
    if (props.onMouseMove) {
      props.onMouseMove()
    }
    setObjectState(prevObjectState => {
      let x = e.clientX - prevObjectState.dragDiffX
      let y = e.clientY - prevObjectState.dragDiffY
      x = Math.max(x, props.bounds.left)
      x = Math.min(x, props.bounds.right - prevObjectState.width)
      y = Math.max(y, props.bounds.top)
      y = Math.min(y, props.bounds.bottom - prevObjectState.height)
      return {
        ...prevObjectState, x, y
      }
    })
  }

  const handleMouseUpDragging = (e) => {
    window.removeEventListener('mousemove', handleMouseMoveDragging)
    window.removeEventListener('mouseup', handleMouseUpDragging)
    setIsDragging(false)
    if (props.onMouseUp) {
      props.onMouseUp(e)
    }
  }
  
  const handleOnClick = (e) => {
    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <DraggableContainer
      width={objectState.width}
      height={objectState.height}
      onMouseDown={handleMouseDownDragging}
      onClick={handleOnClick}
      x={objectState.x}
      y={objectState.y}
      isDragging={isDragging}
      className="draggable">
      { props.canBeResized && <Resizable onMouseDown={handleMouseDownResizing} /> }
      {props.children}
    </DraggableContainer>
  )
}

Draggable.defaultProps = {
  grid: { x: 1, y: 1 },
  defaultPosition: { x: 0, y: 0 },
  size: { x: 100, y: 100 },
  minSize: { x: 40, y: 40 },
  maxSize: { x: 160, y: 160 },
  bounds: { left: 0, top: 0, right: 700, bottom: 200 }
}

export default Draggable
