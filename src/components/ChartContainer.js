import Draggable from 'react-draggable'
import './ChartContainer.css'

const ChartContainer = () => {
    const bounds = { left: 0, top: 0, right: 400, bottom: 400 }

    return (
        <Draggable
            bounds={bounds}
            grid={[20, 20]}>
            <div className="ChartContainer">
                <div className='resizers'>
                    <div className='lines'>
                        <div className='resizer left'></div>
                        <div className='resizer top'></div>
                        <div className='resizer right'></div>
                        <div className='resizer bottom'></div>
                    </div>
                    <div className='angles'>
                        <div className='resizer top left'></div>
                        <div className='resizer top right'></div>
                        <div className='resizer bottom left'></div>
                        <div className='resizer bottom right'></div>
                    </div>
                </div>
                <div>ChartContainer</div>
            </div>
        </Draggable>
    )
}

export default ChartContainer
