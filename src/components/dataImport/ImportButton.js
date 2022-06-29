import { Button } from "antd"
import { useDispatch } from "react-redux"
import { setImportModalVisible } from "../../reducers/configureImportModal"

const ImportButton = () => {
  const dispatch = useDispatch()
  return (
    <Button type='primary' onClick={() => dispatch(setImportModalVisible(true))}>Import Data</Button>
  )
}

export default ImportButton
