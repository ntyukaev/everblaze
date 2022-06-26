import { useDispatch } from "react-redux"
import { useDrag } from "react-dnd"
import { attachFieldToChart } from "../../../reducers/configureCharts"
import { dndTypes } from "./dndTypes"

const DataField = ({ name, fieldId }) => {
  const dispatch = useDispatch()
  const [{ opacity }, drag] = useDrag(() => ({
    type: dndTypes.FIELD,
    item: { name, fieldId },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        console.log(item.fieldId)
        dispatch(attachFieldToChart({
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

export default DataField
