import React from 'react'
import { Link } from 'react-router-dom'
import '../styling/sideBar.css'

// const SideNav = () => {
//     return (
//         <div className='container'>
//             <nav className='sidebar-links'>
//                 <ul className='sidebar-links__one'>
//                     <li className='text'>
//                         <Link className='sidebar-link' to='/orders'>
//                             Orders
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     )
// }

const SideNav = () => {
    return (
        <div className='container'>
            <nav className='sidebar-links'>
                <ul className='sidebar-links__one'>
                    <li className='text'>
                        <div className='sidebar-link' to='/orders'>
                            Orders
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}


export default SideNav;
