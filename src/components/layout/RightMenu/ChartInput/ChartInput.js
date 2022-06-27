import { Card } from 'antd'
import ChartField from './ChartField'

const ChartInput = () => {
  return (
    <Card className='chart-input' size="small" title="Chart Input">
      <ChartField chartInputFieldName='X-axis'/>
    </Card>
  )
}

export default ChartInput
