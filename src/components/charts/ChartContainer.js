import { useDispatch, useSelector } from 'react-redux'
import { selectChart } from '../../reducers/configureCharts'
import Draggable from '../common/Draggable'
import chartTypes from './chartTypes'
import './ChartContainer.css'

const ChartContainer = ({ resolution, bounds, type, id }) => {
  const dispatch = useDispatch()
  const selectedChart = useSelector((state) => state.chartConfig.selectedChart)
  const isSelected = selectedChart === id
  const Chart = chartTypes[type]
  
  const select = () => {
    dispatch(selectChart(id))
  }

  return (
    <Draggable
      bounds={bounds}
      size={{ x: resolution, y: resolution }}
      minSize={{ x: resolution / 2, y: resolution / 2 }}
      maxSize={{ x: resolution * 2, y: resolution * 20 }}
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
