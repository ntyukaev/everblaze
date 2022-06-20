import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'antd'
import chartTypes from '../../charts/chartTypes'
import { addChart, selectChart, updateChart } from '../../../reducers/configureCharts'

const ChartSelection = () => {
  const dispatch = useDispatch()
  const charts = useSelector((state) => state.chartConfig.charts)
  const selectedChart = useSelector((state) => state.chartConfig.selectedChart)

  const chooseChartType = (e) => {
    const chartType = e.target.className
    if (selectedChart != null) {
      dispatch(updateChart({ type: chartType, id: selectedChart }))
    }
    else {
      dispatch(addChart({ type: chartType, id: charts.length }))
      dispatch(selectChart(charts.length))
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
