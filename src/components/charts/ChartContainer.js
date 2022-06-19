import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unselectChart, selectChart } from '../../reducers/configureCharts'
import Draggable from '../common/Draggable'
import chartTypes from './chartTypes'
import './ChartContainer.css'

const ChartContainer = ({ grid, bounds, type, id }) => {
  const dispatch = useDispatch()
  const selectedChart = useSelector((state) => state.chartConfig.selectedChart)
  const isSelected = selectedChart === id
  const Chart = chartTypes[type]

  useEffect(() => {
    if (isSelected) {
      window.addEventListener('mousedown', unselect)
    }
    else {
      window.removeEventListener('mousedown', unselect)
    }
  }, [isSelected])
  
  const select = () => {
    dispatch(selectChart(id))
  }

  const unselect = () => {
    dispatch(unselectChart())
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
