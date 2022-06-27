import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Card } from 'antd'
import chartTypes from '../../../charts/chartTypes'
import { addChart, selectChart, setChartType } from '../../../../reducers/configureCharts'

const ChartSelection = () => {
  const dispatch = useDispatch()
  const selectedChart = useSelector((state) => state.chartConfig.selectedChart)
  
  const chooseChartType = (e) => {
    const chartType = e.target.className
    if (selectedChart != null) {
      dispatch(setChartType({ type: chartType, id: selectedChart }))
    }
    else {
      const id =  uuidv4()
      dispatch(addChart({id, type: chartType }))
      dispatch(selectChart(id))
    }
  }

  return (
    <Card size="small" title="Select Chart">
      <div className='chart-types' onClick={chooseChartType}>
        {Object.keys(chartTypes).map((ch) => (
          <div key={ch} className={ch}>{ch}</div>  
        ))}
      </div>
    </Card>
  )
}

export default ChartSelection
