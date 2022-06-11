import './Resizable.css'

// const Resizable = (props) => {
//     return (
//         <div className='resizable'>
//             <div className='resizers'>
//                 <div className='lines'>
//                     <div className='resizer left'></div>
//                     <div className='resizer top'></div>
//                     <div className='resizer right'></div>
//                     <div className='resizer bottom'></div>
//                 </div>
//                 <div className='angles'>
//                     <div className='resizer top left'></div>
//                     <div className='resizer top right'></div>
//                     <div className='resizer bottom left'></div>
//                     <div className='resizer bottom right'></div>
//                 </div>
//             </div>
//             <div>{props.children}</div>
//         </div>
//     )
// }

const Resizable = (props) => {
    return (
        <div className='resizable'>
            <div>{props.children}</div>
        </div>
    )
}

export default Resizable
