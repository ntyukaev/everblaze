import { useSelector } from 'react-redux'
import { Layout } from 'antd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ChartSelection from './ChartSelection'
import ChartInput from './ChartInput'
import DatasetSelection from './DatasetSelection'

const { Sider } = Layout

const RightMenu = () => {
  const selectedChart = useSelector((state) => state.chartConfig.selectedChart)
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
      <DndProvider backend={HTML5Backend}>
        <ChartSelection />
        <DatasetSelection />
        {selectedChart != null && <ChartInput />}
      </DndProvider>
    </Sider>
  )
}

export default RightMenu
