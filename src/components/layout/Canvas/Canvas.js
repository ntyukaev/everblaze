import { Layout } from 'antd'
import Dashboard from "./Dashboard.js"

const { Content } = Layout

const Canvas = () => {
  return (
    <Content
      style={{
        margin: '0',
        overflow: 'initial',
        width: '100%',
        height: '100%'
      }}
    >
      <Dashboard />
    </Content>
  )
}

export default Canvas
