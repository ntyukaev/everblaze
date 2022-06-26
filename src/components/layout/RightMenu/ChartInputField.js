import { useSelector } from 'react-redux'
import { useDrop } from "react-dnd"
import { dndTypes } from "./dndTypes"

const ChartInputField = ({ chartInputFieldName }) => {
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
        charts[selectedChart].fields.filter(([, axis]) => axis === chartInputFieldName).map(([fieldId,]) => (
          <div>{fields[fieldId].name}</div>
        ))
      }
    </div>
  )
}

export default ChartInputField
