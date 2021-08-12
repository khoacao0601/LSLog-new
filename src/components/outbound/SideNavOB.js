import React, {useState} from 'react';
//import { Link } from 'react-router-dom'
import '../../styling/sideBar.css'
import { useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import {useDispatch} from 'react-redux';
import {setViews} from '../../store/reducer/topNavBarViewsControl';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
//import List from '@material-ui/core/List';
//import ListItem from '@material-ui/core/ListItem';
//import ListItemText from '@material-ui/core/ListItemText';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const drawerWidth = 270;
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#E0E0E0",
        border: "none",
        marginTop: "20px",
    },
    drawerContainer: {
        overflow: 'auto',
    },
    sidebarList: {
        paddingTop: "100px",
    },
    sidebarItem: {
        paddingRight: "0",
        lineHeight: "5vh",
        height: "6vh",
        '&:hover': {
            background: "none",
        },
    },
    sidebarText: {
        backgroundColor: "#E0E0E0",
        color: "#5D5D5D",
        fontWeight: "600",
        padding: "20px",
        marginLeft: "24px",
        textAlign: "center",
        borderRadius: "20px 0px 0px 20px",
        background: "#f8f9fa",
        cursor: "pointer",
        '&:hover': {
            color: "#5D5D5D",
            background: "#FFFFFF",
            textDecoration: "none",
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
    menuGroupVert: {
      width: "100%",
      paddingTop: "45px",
    },
    menuButton: {
      marginRight: theme.spacing(0),
      textAlign: "center",
      border: "none",
      borderRadius: "20px 0px 0px 20px !important",
      lineHeight: "3vh",
      background: "#E0E0E0",
      marginTop: "auto",
      color: "#5D5D5D",
      fontWeight: "600",
      padding: "0 20px",
      marginBottom: "10%",
      height: "6vh",
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
    menuButtonVert: {
        textAlign: "center",
        border: "none",
        margin: "10px 0 10px 40px",
        borderRadius: "20px 0 0 20px !important",
        lineHeight: "3vh",
        background: "#E0E0E0",
        color: "#5D5D5D",
        fontWeight: "600",
        padding: "0 20px",
        height: "5rem",
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
    menuButtonVertTwo: {
        textAlign: "center",
        border: "none",
        margin: "10px 0 10px 40px",
        borderRadius: "20px 0 0 20px !important",
        lineHeight: "3vh",
        background: "#E0E0E0",
        color: "#5D5D5D",
        fontWeight: "600",
        padding: "0 20px",
        height: "5rem",
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
      }
    }));

const SideNavOutbound = () => {
    const classes = useStyles();
    
    const history = useHistory();


    const [view, setView] = useState('outbound');
    const handleView = () => {
      history.push('/outbound/fulfillment');
    };
    return (
        <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }}>
          <Toolbar />
          <div>
            <ToggleButtonGroup className={classes.menuGroupVert} value={view} exclusive orientation="vertical" onChange={handleView} aria-label="text alignment">
                  <NavLink 
                    to="/Outbound/unplanned-fulfillment" 
                    activeStyle={{backgroundColor: "white"}} 
                    className={classes.menuButton}
                    >
                      ORDERS
                  </NavLink>
                  <NavLink 
                    to="/outbound/planned-waves" 
                    activeStyle={{backgroundColor: "white"}} 
                    className={classes.menuButton}
                    >
                      WAVES
                  </NavLink>
                  <NavLink 
                    to="/Outbound/Complete" 
                    activeStyle={{backgroundColor: "white"}} 
                    className={classes.menuButton}
                    >
                      COMPLETE
                  </NavLink>
            </ToggleButtonGroup>
          </div>
        </Drawer>
    )
}

export default SideNavOutbound;