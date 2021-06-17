import React from 'react';
import LSLLogo from '../images/LSL Logo.png';
import {setViews} from '../store/reducer/viewsControlSlice';
import {useDispatch} from 'react-redux';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
        flexGrow: 1,
        background: '#f8f9fa ',
        //paddingTop:'20px',
        zIndex: theme.zIndex.drawer + 1,
      },
      menuButton: {
        marginRight: theme.spacing(3),
        color: "#000000",
        fontWeight: "bold",
        padding: "0 20px",
        height: "4vh",
        textAlign: "center",
        borderRadius: "20px 20px 0px 0px",
        lineHeight: "3vh",
        background: "#f8f9fa",
        marginTop: "auto",
        '&:hover': {
            color: "#000000",
            background: "#FFFFFF",
            textDecoration: "none",
        }
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
        <AppBar className={classes.appBar} position="static" elevation={0}>
            <Toolbar>
            <img src={LSLLogo} style={{width:"3%"}} alt=""></img>
                <Typography variant="h6" className={classes.title}>
                LifeScience Logistics
                </Typography>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <Link className={classes.menuButton} href="Home" onClick={loginView}>HOME <span className="sr-only">(current)</span></Link>
                <Link className={classes.menuButton} href="About" onClick={aboutView}>ABOUT</Link>
                <Link className={classes.menuButton} href="Contact" onClick={contactView}>CONTACT</Link>
                <Link className={classes.menuButton} href="Help" onClick={helpView}>HELP</Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header;


