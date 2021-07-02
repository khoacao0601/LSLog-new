import React, {useState} from 'react';
import LSLLogo from '../images/LSL Logo.png';
import {setViews} from '../store/reducer/viewsControlSlice';
import {useDispatch} from 'react-redux';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
        lineHeight: "3vh",
        background: "#E0E0E0",
        marginTop: "auto",
        color: "#5D5D5D",
        fontWeight: "600",
        padding: "0 20px",
        height: "4rem",
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

    const dispatch = useDispatch();

    const [view, setView] = useState('login');
    const handleView = (event, newView) => {
      if (newView !== null) {
        setView(newView);
        dispatch(setViews(newView));
      };
    };
    
    return(
        <AppBar className={classes.appBar} position="static" elevation={0}>
          <Toolbar>
            <img src={LSLLogo} style={{width:"3%"}} alt=""></img>
            <Typography variant="h6" className={classes.title}>LifeScience Logistics</Typography>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <ToggleButtonGroup className={classes.menuGroup} value={view} exclusive onChange={handleView} aria-label="text alignment">
                <ToggleButton className={classes.menuButton} value="login">HOME</ToggleButton>
                <ToggleButton className={classes.menuButton} value="about">ABOUT</ToggleButton>
                <ToggleButton className={classes.menuButton} value="contact">CONTACT</ToggleButton>
                <ToggleButton className={classes.menuButton} value="help">HELP</ToggleButton>
            </ToggleButtonGroup>
          </Toolbar>
        </AppBar>
    )
};

export default Header;