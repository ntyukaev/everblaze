import { useDispatch } from "react-redux"
import { useDrag } from "react-dnd"
import { attachFieldToChart } from "../../../../reducers/configureCharts"
import { dndTypes } from "./dndTypes"

const DataColumn = ({ name, fieldId }) => {
  const dispatch = useDispatch()
  const [{ opacity }, drag] = useDrag(() => ({
    type: dndTypes.FIELD,
    item: { name, fieldId },
    end: (item, monitor) => {
      console.log('ive triggered for no fucking reason')
      const dropResult = monitor.getDropResult()
      if (dropResult) {
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

export default DataColumn
