import React from 'react'
import { Link } from 'react-router-dom'
import sidebar from '../styling/sideBar.css'

const SideNav = () => {
    return (
        <div className='container'>
            <nav className='sidebar-links'>
                <ul className='sidebar-links__one'>
                    <li ><Link className='sidebar-link' to='/orders'>Orders</Link></li>
                    {/* <li className='sidebar-link'><Link to='/orders'>Receiving</Link></li>
                    <li className='sidebar-link'><Link to='/orders'>Outbounds</Link></li> */}
                </ul>
            </nav>                
        </div>
    )
}

export default SideNav;
