import _ from "lodash"
import { Button } from "antd"
import { useSelector, useDispatch } from 'react-redux'
import { addPage } from "../../../reducers/configurePages"

const PageList = () => {
  const dispatch = useDispatch()
  const pageCounter = useSelector((state) => state.pageConfig.counter)
  return (
    <div className="Pagination">
      {_.range(1, pageCounter + 1).map((p) => (
        <Button>{`Page ${p}`}</Button>
      ))}
      <Button onClick={() => dispatch(addPage())}>+</Button>
    </div>
  )
}

export default PageList
