import Draggable from './Draggable'
import './ChartContainer.css'
import ChartExample from './ChartExample'

const ChartContainer = ({ grid, bounds }) => {
  return (
    <Draggable
      grid={grid}
      bounds={bounds}
      size={{ x: grid.x * 20, y: grid.y * 10 }}
      minSize={{ x: grid.x * 20, y: grid.y * 10 }}
      maxSize={{ x: grid.x * 40, y: grid.y * 20 }}
    >
      <ChartExample />
    </Draggable>
  )
}

export default ChartContainer
