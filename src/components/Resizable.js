import './ResizableContainer.css'

const ResizableContainer = (props) => {
    return (
        <div className='resizable'>{props.children}</div>
    )
}

export default ResizableContainer
