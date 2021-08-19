import React from 'react';
import LSLLogo from '../images/LSL Logo.png';
//import {setViews} from '../store/reducer/viewsControlSlice';
//import {useDispatch} from 'react-redux';

//import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
        flexGrow: 1,
        background: '#E0E0E0 ',
        paddingTop:'40px',
        zIndex: theme.zIndex.drawer + 1,
        height: "104px",
      },
      menuGroup: {
        height: "64px",
      },
      menuButton: {
        marginRight: theme.spacing(3),
        textAlign: "center",
        border: "none",
        borderRadius: "20px 20px 0px 0px !important",
        lineHeight: "50px",
        background: "#E0E0E0",
        marginTop: "auto",
        color: "#5D5D5D",
        fontWeight: "600",
        padding: "0 20px",
        height: "50px",
        width: "8%",
        '&:hover': {
            color: "#5D5D5D",
            background: "#FFFFFF",
            textDecoration: "none",
        },
        '&:focus': {
          outline: "none",
        },
        "& >span": {
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            fontWeight: "500",
            fontSize: "1rem",
        },
        "&.Mui-selected": {
            backgroundColor: "#FFFFFF",
            '&:hover': {
                background: "#FFFFFF",
            },
        }
    },
    title: {
        marginRight: theme.spacing(4),
        color: "#000000",
      },
      black: {
        color: "#000000",
      },
      }));
      
const Header = () => {
    const classes = useStyles();

    //const dispatch = useDispatch();

    /*const [alignment, setAlignment] = useState('login');
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
        dispatch(setViews(newAlignment));
    };*/

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
                
                <NavLink exact to="/" activeStyle={{backgroundColor: "white"}} className={classes.menuButton}>HOME</NavLink>
                <NavLink to="/About" activeStyle={{backgroundColor: "white"}} className={classes.menuButton}>ABOUT</NavLink>
                <NavLink to="/Contact" activeStyle={{backgroundColor: "white"}} className={classes.menuButton}>CONTACT</NavLink>
                <NavLink to="/Help" activeStyle={{backgroundColor: "white"}} className={classes.menuButton}>HELP</NavLink>

            </Toolbar>
        </AppBar>
    )
};

export default Header;