import { useDispatch, useSelector } from 'react-redux'
import { selectChart } from '../../reducers/configureCharts'
import Draggable from '../common/Draggable'
import chartTypes from './chartTypes'
import './ChartContainer.css'

const ChartContainer = ({ grid, bounds, type, id }) => {
  const dispatch = useDispatch()
  const selectedChart = useSelector((state) => state.chartConfig.selectedChart)
  const isSelected = selectedChart === id
  const Chart = chartTypes[type]
  
  const select = () => {
    dispatch(selectChart(id))
  }

  return (
    <Draggable
      grid={grid}
      bounds={bounds}
      size={{ x: grid.x * 20, y: grid.y * 10 }}
      minSize={{ x: grid.x * 20, y: grid.y * 10 }}
      maxSize={{ x: grid.x * 40, y: grid.y * 20 }}
      canBeResized={isSelected}
      onMouseDown={select}
      onMouseUp={select}
      onMouseMove={select}
    >
      <Chart />
    </Draggable>
  )
}

export default ChartContainer
