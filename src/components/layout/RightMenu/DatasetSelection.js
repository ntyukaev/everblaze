import { Card } from 'antd'
import { useSelector } from 'react-redux'
import DataField from './DataField'

const DatasetSelection = () => {
  const datasets = useSelector((state) => state.datasetConfig.datasets)
  const fields = useSelector((state) => state.datasetConfig.fields)
  return (
    <Card className='dataset-selection' size="small" title="Dataset Selection">
      {datasets.map((dataset) => {
        return (
          <>
            <div>{dataset}</div>
            {fields.filter((field) => field.dataset === dataset).map((field) => (
              <DataField name={field.name} index={field.index} />
            ))}
          </>
        )
      })}
    </Card>
  )
}

export default DatasetSelection
