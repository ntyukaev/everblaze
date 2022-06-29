import { useDispatch } from "react-redux"
import { useDrag } from "react-dnd"
import { changeFieldAxis } from "../../../../reducers/configureCharts"
import { dndTypes } from "./dndTypes"

const MoveBetweenDataColumn = ({ name, fieldId }) => {
  const dispatch = useDispatch()
  const [{ opacity }, drag] = useDrag(() => ({
    type: dndTypes.FIELD,
    item: { name, fieldId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        dispatch(changeFieldAxis({
          axis: dropResult.chartInputFieldName,
          chartId: dropResult.selectedChart,
          fieldId: item.fieldId
        }))
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  }),
    [name]
  )

  return (
    <div ref={drag} style={{ opacity }}>
      {name}
    </div>
  )
}

export default MoveBetweenDataColumn
