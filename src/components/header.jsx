import React from 'react';
import LSLLogo from '../images/LSL Logo.png';
import {setViews} from '../store/reducer/viewsControlSlice';
import {useDispatch} from 'react-redux';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: "#000000",
    },
    title: {
        marginRight: theme.spacing(4),
        //flexGrow: 1,
        color: "#000000",
      },
      black: {
        color: "#000000",
      },
      }));
  const Header = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const loginView = (event) => {
        event.preventDefault();
        dispatch(setViews('login'));
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
        <AppBar position="static" style={{ background: '#f8f9fa ', paddingTop:'20px'}} elevation={0}>
        <Toolbar>
        <img src={LSLLogo} style={{width:"3%"}} alt=""></img>
            <Typography variant="h6" className={classes.title}>
            LifeScience Logistics
            </Typography>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
            <Link className={classes.menuButton} href="Home" onClick={loginView}>Home <span className="sr-only">(current)</span></Link>
            <Link className={classes.menuButton} href="About" onClick={aboutView}>About</Link>
            <Link className={classes.menuButton} href="Contact" onClick={contactView}>Contact</Link>
            <Link className={classes.menuButton} href="Help" onClick={helpView}>Help</Link>
        </Toolbar>
        </AppBar>
    )
}

export default Header;


