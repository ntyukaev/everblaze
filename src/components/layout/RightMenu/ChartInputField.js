import { useSelector } from 'react-redux'
import { useDrop } from "react-dnd"
import { dndTypes } from "./dndTypes"

const ChartInputField = ({ chartInputFieldName }) => {
  const selectedChart = useSelector((state) => state.chartConfig.selectedChart)
  const fields = useSelector((state) => state.datasetConfig.fields)
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
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  )
}
export default ChartInputField
