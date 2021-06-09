/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import LSLLogo from '../images/LSL Logo.png';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: "#000000",
      },
      black: {
        color: "#000000",
      },
      }));
  const Header = () => {
    const classes = useStyles();
    return(
        <AppBar position="static" style={{ background: '#f8f9fa '}} elevation={0}>
        <Toolbar>
        <img src={LSLLogo} style={{width:"3%"}}></img>
            <Typography variant="h6" className={classes.title}>
            LifeScience Logistics
            </Typography>
            <Button component={ Link } to="/Login" className={classes.black}>Home</Button>
            <Button component={ Link } to="/About" className={classes.black}>About</Button>
            <Button component={ Link } to="/Contact" className={classes.black}>Contact</Button>
            <Button component={ Link } to="/Help" className={classes.black}>Help</Button>
        </Toolbar>
        </AppBar>
    )
}

export default Header;


