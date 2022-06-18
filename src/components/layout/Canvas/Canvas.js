import { Layout } from 'antd'
import ChartArea from "./ChartArea.js"

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
      <ChartArea />
    </Content>
  )
}

export default Canvas
