import Draggable from '../common/Draggable'
import chartTypes from './chartTypes'
import './ChartContainer.css'

const ChartContainer = ({ grid, bounds, type }) => {
  const Chart = chartTypes[type]

  return (
    <div className='chart-container'>
      <Draggable
        grid={grid}
        bounds={bounds}
        size={{ x: grid.x * 20, y: grid.y * 10 }}
        minSize={{ x: grid.x * 20, y: grid.y * 10 }}
        maxSize={{ x: grid.x * 40, y: grid.y * 20 }}
      >
        <Chart />
      </Draggable>
    </div>
  )
}

export default ChartContainer
