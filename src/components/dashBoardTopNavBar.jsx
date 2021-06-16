import React from 'react';
import LSLLogo from '../images/LSL Logo.png';
import Radium from 'radium'; //CSS-in-JS library support '&:hover'
import {useDispatch} from 'react-redux';
import {setViews} from '../store/reducer/topNavBarViewsControl';

import Link from '@material-ui/core/Link';
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

const useStyles = makeStyles((theme) => ({
    appBar: {
        flexGrow: 1,
        background: '#f8f9fa ',
        //paddingTop:'20px',
        zIndex: theme.zIndex.drawer + 1,
      },
    grow: {
        flexGrow: 1,
      },
    root: {
      flexGrow: 1,
    },
    searchBar: {
      marginRight: "24px",
      marginBottom: "24px",
      minWidth: "300px",
      height: "8.5px",
      "& >label": {
          transform: "translate(14px, 10px) scale(1)",
      },
      "& >div>input": {
          padding: "8.5px 14px",
      },
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

    const onClickInbound = () => {dispatch(setViews('inbound'));};
    const onClickInventory = () => {dispatch(setViews('inventory'));};
    const onClickOutbound = () => {dispatch(setViews('outbound'));};
    const onClickNotifications = () => {dispatch(setViews('outbound'));};

    const [open, setOpen] = React.useState(false);
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
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

    return (
        <AppBar className={classes.appBar} position="fixed" elevation={0}>
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
                <div className={classes.grow} />
                <TextField className={classes.searchBar} id="globalSearchBar" label="Global Search" variant="outlined" type="globalSearchBar"/>
                <Link className={classes.menuButton} href="#" key="key4" onClick={onClickNotifications}>NOTIFICATIONS</Link>
                <Link className={classes.menuButton} href="#" ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}>
                SETTINGS
                </Link>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
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