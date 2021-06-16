import React, {useState} from 'react';
import LSLLogo from '../images/LSL Logo.png';
import Radium from 'radium'; //CSS-in-JS library support :hover
import {useDispatch} from 'react-redux';
import {setViews} from '../store/reducer/topNavBarViewsControl';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    searchBar: {
        marginRight: "24px",
        minWidth: "130px",
    },
    menuButton: {
        marginRight: theme.spacing(3),
        color: "#000000",
        fontWeight: "bold",
        padding: "0 20px",
        height: "6vh",
        textAlign: "center",
        borderRadius: "20px 20px 0px 0px",
        lineHeight: "5vh",
        background: "#f8f9fa",
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

      navButton: {
        color: "black",
        height: "6vh",
        width: "8vw",
        textAlign: "center",
        borderRadius: "20px 20px 0px 0px",
        lineHeight: "5vh",
        fontWeight: "bold",
    },
    globalSearchBar: {
        width: "20vw",
        marginTop: "1vh"
    },
}));

const DashBoardTopNavBar = () => {
    const classes = useStyles();

    const homeView = (event) => {
        dispatch(setViews('login'));
    };

    const dispatch = useDispatch();

    const onClickInbound = () => {
        dispatch(setViews('inbound'));
    };

    const onClickInventory = () => {
        dispatch(setViews('inventory'));
    };

    const onClickOutbound = () => {
        dispatch(setViews('outbound'));
    };

    const [anchorEl, setAnchorEl] = useState();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl();
    };
    return (
        <AppBar position="static" style={{ background: '#f8f9fa ', paddingTop:'20px'}} elevation={0}>
            <Toolbar>
                <img src={LSLLogo} style={{width:"3%"}} alt="" onClick={homeView}></img>
                <a href="Home" onClick={homeView}><Typography variant="h6" className={classes.title} onClick={homeView}>
                LifeScience Logistics
                </Typography></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <Link className={classes.menuButton} href="#" key="key1" onClick={onClickInbound}>INBOUND <span className="sr-only">(current)</span></Link>
                <Link className={classes.menuButton} href="#" key="key2" onClick={onClickInventory}>INVENTORY</Link>
                <Link className={classes.menuButton} href="#" key="key3" onClick={onClickOutbound}>OUTBOUND</Link>
                <TextField className={classes.searchBar} id="globalSearchBar" label="Global Search" variant="outlined" type="globalSearchBar"/>
                <Link aria-controls="simple-menu" aria-haspopup="true" className={classes.menuButton} href="#" onClick={handleClick}>NOTIFICATIONS</Link>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Users Info</MenuItem>
                    <MenuItem onClick={handleClose}>DarkMode</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default Radium(DashBoardTopNavBar);