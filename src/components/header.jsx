/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import LSLLogo from '../images/LSL Logo.png';
import {setViews} from '../store/reducer/viewsControlSlice';
import {useDispatch} from 'react-redux';

const Header = () => {

    const dispatch = useDispatch();
    console.log(dispatch);

    const homeView = (event) => {
        event.preventDefault();
        dispatch(setViews('home'));
    };
    const aboutView = (event) => {
        event.preventDefault();
        dispatch(setViews('about'));
    };
    const contactView = (event) => {
        event.preventDefault();
        dispatch(setViews('contact'));
    };
    const helpView = (event) => {
        event.preventDefault();
        dispatch(setViews('help'));
    };


    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src={LSLLogo} style={{width:"3%"}}></img>
        <a className="navbar-brand" href="#">LifeScience Logistics</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <a className="nav-item nav-link active" href="Home" onClick={homeView}>Home <span className="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href="About" onClick={aboutView}>About</a>
                <a className="nav-item nav-link" href="Contact" onClick={contactView}>Contact</a>
                <a className="nav-item nav-link" href="Help" onClick={helpView}>Help</a>
            </div>
        </div>
    </nav>
    )
}

export default Header;


