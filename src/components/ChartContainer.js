import Draggable from './Draggable'
import './ChartContainer.css'


const ChartContainer = () => {
  return (
    <Draggable cellSize={20}>
        <div className='ChartContainer'></div>
    </Draggable>
  )
}

export default ChartContainer
