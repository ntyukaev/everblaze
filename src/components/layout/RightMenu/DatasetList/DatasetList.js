import { Card } from 'antd'
import { useSelector } from 'react-redux'
import { DataColumn } from '../common'

const DatasetList = () => {
  const datasets = useSelector((state) => state.chartConfig.datasets)
  const fields = useSelector((state) => state.chartConfig.fields)
  return (
    <Card className='dataset-selection' size="small" title="Dataset Selection">
      {datasets.map((dataset) => (
        <div key={dataset} className='dataset'>
          <div>{dataset}</div>
          {
            Object.keys(fields).filter((key) => fields[key].dataset === dataset).map((key) => (
              <DataColumn key={key} name={fields[key].name} fieldId={key} />
            ))
          }
        </div>
      )
      )}
    </Card>
  )
}

export default DatasetList
