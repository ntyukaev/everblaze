import { useState, useEffect } from "react"
import styled from 'styled-components'

const Container = styled.div.attrs(({ x, y }) => ({
  style: {
    transform: `translate(${x}px, ${y}px)`
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
`

const Draggable = (props) => {
  const [dragging, setDragging] = useState(false)
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

  const handleMouseUp = ({clientX, clientY}) => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    setPosition({
      x: clientX - diff.x,
      y: clientY - diff.y,
    })
    setDragging(false)
  }

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
  }, [dragging])

  const handleMouseMove = ({ clientX, clientY }) => {
    setTranslate({
      x: clientX - diff.x,
      y: clientY - diff.y
    })
  }

  const handleMouseDown = ({ clientX, clientY }) => {
    setDiff({ x: clientX - position.x, y: clientY - position.y })
    setDragging(true)
  }

  return (
    <Container onMouseDown={handleMouseDown} x={translate.x} y={translate.y} dragging={dragging} className="draggable">
      {props.children}
    </Container>
  )
}


export default Draggable
