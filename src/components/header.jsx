/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import LSLLogo from '../images/LSL Logo.png';
import {Link} from 'react-router-dom';

const Header = () => {

   
    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src={LSLLogo} style={{width:"3%"}}></img>
        <a className="navbar-brand" href="#">LifeScience Logistics</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-item nav-link active" to="/Login" >Home </Link>
                <Link className="nav-item nav-link" to="/About" >About</Link>
                <Link className="nav-item nav-link" to="/Contact">Contact</Link>
                <Link className="nav-item nav-link" to="/Help" >Help</Link>
            </div>
        </div>
    </nav>
    )
}

export default Header;


