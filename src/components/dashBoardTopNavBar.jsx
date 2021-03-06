import React, {useEffect, useState, useRef} from 'react';
import LSLLogo from '../images/LSL Logo.png';
import Radium from 'radium'; //CSS-in-JS library support '&:hover'
import {useDispatch} from 'react-redux';
//import {setViews} from '../store/reducer/topNavBarViewsControl';

//import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ToggleButton from '@material-ui/lab/ToggleButton';
//import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import NotificationsIcon from '@material-ui/icons/Notifications';
//import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
//import {setViews} from '../store/reducer/viewsControlSlice';
import { NavLink, Link, useLocation} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
    background: '#E0E0E0 ',
    paddingTop:'40px',
    zIndex: theme.zIndex.drawer + 1,
    height: "104px",
  },
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  searchBar: {
    marginRight: "24px",
    marginBottom: "10px",
    marginTop: "auto",
    minWidth: "300px",
    height: "35px",
    "& >label": {
        transform: "translate(14px, 10px) scale(1)",
    },
    "& >div": {
      background: "white",
    },
    "& >div>input": {
      padding: "8.5px 14px",
    },
  },
  title: {
    marginRight: theme.spacing(4),
    color: "#000000",
    },
  black: {
    color: "#000000",
  },
  globalSearchBar: {
    width: "20vw",
    marginTop: "1vh"
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
  menuList: {
    color: "#5D5D5D",
    "& >li>a": {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      fontWeight: "400",
      fontSize: "1rem",
      color: "#5D5D5D",
    },
  },
}));

const DashBoardTopNavBar = () => {

    // Storing useHistory() in a variable
    const history = useHistory();
    const { pathname } = useLocation();

    const classes = useStyles();

    const dispatch = useDispatch();

   /* const homeView = (event) => {
        dispatch(setViews('login'));
    };

    const dispatch = useDispatch();

    const [view, setView] = useState('inbound');
    const handleView = (event, newView) => {
      if (newView !== null) {
        setView(newView);
        dispatch(setViews(newView));
      };
    };*/

    const [open, setOpen] = React.useState(false);
    // const [tabToggle, setTabToggle] = useState(true);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    const logOut = () => {
      //localStorage.removeItem("value");
      history.push('/');
      localStorage.clear();
      window.location.reload();
    }
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
      prevOpen.current = open;
    }, [open]);
    
    return (
        <AppBar className={classes.appBar} position="fixed" elevation={0}>
            <Toolbar>
                <img src={LSLLogo} style={{width:"3%"}} alt=""></img>
                <a href="Home" ><Typography variant="h6" className={classes.title}>
                LifeScience Logistics
                </Typography></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                
                  <NavLink 
                    exact to="/Inbound/Orders" 
                    activeStyle={{backgroundColor: "white"}} 
                    className={classes.menuButton}
                    isActive={() => ['/Inbound/Orders', '/Inbound/OrderDetails', '/Inbound/CreateOrder'].includes(pathname)} 
                    >
                      INBOUND
                  </NavLink>
                  <NavLink 
                    to="/Inventory" 
                    activeStyle={{backgroundColor: "white"}} 
                    className={classes.menuButton}
                    >
                      INVENTORY
                  </NavLink>
                  <NavLink 
                    to="/OutBound/unplanned-fulfillment" 
                    activeStyle={{backgroundColor: "white"}} 
                    className={classes.menuButton}
                    isActive={() => ['/outbound/planned-waves', '/Outbound/Complete', '/Outbound/unplanned-fulfillment'].includes(pathname)} 
                    >
                      OUTBOUND
                  </NavLink>
                
                <div className={classes.grow} />
                  <TextField className={classes.searchBar} id="globalSearchBar" label="Global Search" variant="outlined" type="globalSearchBar"/>
                  <ToggleButton className={classes.menuButton} value="notifications"><NotificationsIcon></NotificationsIcon></ToggleButton>
                  <ToggleButton className={classes.menuButton} ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}><AccountCircleIcon></AccountCircleIcon></ToggleButton>
                  <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList className={classes.menuList} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My Account</MenuItem>
                                <MenuItem ><Link to="/" onClick={logOut}>Log Out</Link></MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                
            </Toolbar>
        </AppBar>
    )
}

export default Radium(DashBoardTopNavBar);