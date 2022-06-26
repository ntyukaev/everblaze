import { useDispatch } from "react-redux"
import { useDrag } from "react-dnd"
import { updateField } from "../../../reducers/configureDatasets"
import { dndTypes } from "./dndTypes"

const DataField = ({ name, index }) => {
  const dispatch = useDispatch()
  const [{ opacity }, drag] = useDrag(() => ({
    type: dndTypes.FIELD,
    item: { name, index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        dispatch(updateField({
          axis: dropResult.chartInputFieldName,
          chart: dropResult.selectedChart,
          index: item.index
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
