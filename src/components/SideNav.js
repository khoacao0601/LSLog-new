import React from 'react'
//import { Link } from 'react-router-dom'
import '../styling/sideBar.css'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
        "& span": {
            fontWeight: "bold",
        },
    },
}));

const SideNav = () => {
    const classes = useStyles();

    return (
        <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }}>
          <Toolbar />
          <div>
          <List className={classes.sidebarList}>
              {['ORDERS'].map((text, index) => (
                <ListItem button key={text} className={classes.sidebarItem}>
                  <ListItemText className={classes.sidebarText} primary={text} to='/orders' />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
    )
}

export default SideNav;
