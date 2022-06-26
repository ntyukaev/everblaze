import { Card } from 'antd'
import { useSelector } from 'react-redux'
import DataField from './DataField'

const DatasetSelection = () => {
  const datasets = useSelector((state) => state.chartConfig.datasets)
  const fields = useSelector((state) => state.chartConfig.fields)
  return (
    <Card className='dataset-selection' size="small" title="Dataset Selection">
      {datasets.map((dataset) => (
        <div key={dataset} className='dataset'>
          <div>{dataset}</div>
          {
            Object.keys(fields).filter((key) => fields[key].dataset === dataset).map((key) => (
              <DataField key={key} name={fields[key].name} fieldId={key} />
            ))
          }
        </div>
      )
      )}
    </Card>
  )
}

export default DatasetSelection
