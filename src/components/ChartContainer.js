import Draggable from './Draggable'
import Resizable from './Resizable'
import './ChartContainer.css'


const ChartContainer = () => {
  return (
    <Draggable>
      <Resizable>
        <div className='ChartContainer'></div>
      </Resizable>
    </Draggable>
  )
}

export default ChartContainer
