import { useSelector } from 'react-redux'
import { useDrop } from "react-dnd"
import MoveBetweenDataColumn from '../common/MoveBetweenDataColumn'
import { dndTypes } from "../common/dndTypes"

const ChartField = ({ chartInputFieldName }) => {
  const selectedChart = useSelector((state) => state.chartConfig.selectedChart)
  const charts = useSelector((state) => state.chartConfig.charts)
  const fields = useSelector((state) => state.chartConfig.fields)
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: dndTypes.FIELD,
      drop: () => ({
        chartInputFieldName,
        selectedChart
      }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    })
  )

  const isActive = canDrop && isOver
  return (
    <div ref={drop}>
      <div>{chartInputFieldName}</div>
      {
        Object.keys(charts[selectedChart].fields)
          .filter((id) => charts[selectedChart].fields[id].axis === chartInputFieldName)
          .map((id) => {
            const fieldId = charts[selectedChart].fields[id].fieldId
            const name = fields[fieldId].name
            return <MoveBetweenDataColumn fieldId={id} name={name} />
          })
      }
    </div>
  )
}

export default ChartField
