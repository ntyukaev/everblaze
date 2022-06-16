import Draggable from './Draggable'
import './ChartContainer.css'


const ChartContainer = ({ grid, bounds }) => {
  return (
    <Draggable
      grid={grid}
      bounds={bounds}
      minSize={{ x: grid.x * 2, y: grid.y * 2 }}
      >
      <div className='ChartContainer'></div>
    </Draggable>
  )
}

export default ChartContainer
