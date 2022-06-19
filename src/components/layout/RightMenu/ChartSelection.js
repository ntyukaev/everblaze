import { useDispatch, useSelector } from 'react-redux'
import { Card, Button } from 'antd'
import { addChart } from '../../../reducers/configureCharts'

const ChartSelection = () => {
  const dispatch = useDispatch()
  const charts = useSelector((state) => state.chartConfig.charts)
  const selectedChart = useSelector((state) => state.chartConfig.selectedChart)
  return (
    <Card
      size="small"
      title="Select Chart"
    >
      <div>Selected Chart: { selectedChart }</div>
      <Button type='default' size='small'>Area Chart</Button>
      <Button type='default' size='small'>Pie Chart</Button>
      <Button type='default' size='small' onClick={() => dispatch(addChart({ type: 'lineChart', id: charts.length }))}>Create Chart</Button>
    </Card>
  )
}

export default ChartSelection
