import { Layout } from 'antd'
import ChartSelection from './ChartSelection'

const { Sider } = Layout

const RightMenu = () => {
  return (
    <Sider
      theme='light'
      width={120}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <ChartSelection/>
    </Sider>
  )
}

export default RightMenu
