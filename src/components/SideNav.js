import React from 'react'
import { Link } from 'react-router-dom'
import sidebar from '../styling/sideBar.css'

const SideNav = () => {
    return (
        <div className='container'>
            <nav className='sidebar-links'>
                <ul className='sidebar-links__one'>
                    <li className='text'>
                        <Link className='sidebar-link' to='/orders'>
                            Orders
                        </Link>
                    </li>
                    <li className='text'>
                        <a className='sidebar-link' to='/orders'>
                            Orders
                        </a>
                    </li>
                </ul>
            </nav>

                    {/* <li className='text'><Link to='/receiving'>Receiving</Link></li>
                    <li className='text'><Link to='/outbounds'>Outbounds</Link></li> */}
        </div>
    )
}

export default SideNav;
