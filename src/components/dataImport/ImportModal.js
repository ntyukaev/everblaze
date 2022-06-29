import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Modal, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import * as XLSX from 'xlsx/xlsx.mjs'
import { setImportModalVisible } from '../../reducers/configureImportModal'
import { addDataset } from '../../reducers/configureCharts'

const ImportModal = () => {
  const dispatch = useDispatch()
  const importModalVisible = useSelector((state) => state.importModalConfig.importModalVisible)

  const customRequest = ({ onSuccess, onError, file }) => {
    console.log(file)
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onload = (e) => {
      const bstr = e.target.result
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' })
      wb.SheetNames.forEach(dataset => {
        const ws = wb.Sheets[dataset]
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
        const header = data[0]
        const fields = {}
        header.forEach((h, i) => {
          const id = uuidv4()
          fields[id] = { dataset, name: h, values: [] }
          data.slice(1).forEach(row => {
            fields[id].values.push(row[i])
          })
        })
        dispatch(addDataset({dataset, fields}))
        console.log(dataset)
        console.log(fields)
      })
      onSuccess(null)
    }
    // reader.onerror(error => onError({ error }))
    if (rABS) {
      reader.readAsBinaryString(file)
    }
    else {
      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <Modal
      title='Import Data'
      centered
      visible={importModalVisible}
      onOk={() => dispatch(setImportModalVisible(false))}
      onCancel={() => dispatch(setImportModalVisible(false))}
    >
      <Upload customRequest={customRequest}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Modal>
  )
}

export default ImportModal
