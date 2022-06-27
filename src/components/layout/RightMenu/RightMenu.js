import { useSelector } from 'react-redux'
import { Layout } from 'antd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ChartSelection from './ChartSelection'
import ChartInput from './ChartInput'
import DatasetList from './DatasetList'

const { Sider } = Layout

const RightMenu = () => {
  const selectedChart = useSelector((state) => state.chartConfig.selectedChart)
  return (
    <Sider
      theme='light'
    >
      <DndProvider backend={HTML5Backend}>
        <ChartSelection />
        <DatasetList />
        {selectedChart != null && <ChartInput />}
      </DndProvider>
    </Sider>
  )
}

export default RightMenu
