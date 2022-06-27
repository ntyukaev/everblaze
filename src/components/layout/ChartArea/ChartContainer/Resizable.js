import './Resizable.css'

const Resizable = ({ onMouseDown }) => {
  return (
    <div className='resizers' onMouseDown={onMouseDown}>
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
  )
}

export default Resizable
