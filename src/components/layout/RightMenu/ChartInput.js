import { Card } from 'antd'
import ChartInputField from './ChartInputField'

const ChartInput = () => {
  return (
    <Card className='chart-input' size="small" title="Chart Input">
      <ChartInputField chartInputFieldName='X-axis'/>
    </Card>
  )
}

export default ChartInput
