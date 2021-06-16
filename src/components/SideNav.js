import React from 'react'
import { Link } from 'react-router-dom'
import '../styling/sideBar.css'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "rgba(51,51,51,0.2)",
        border: "none",
        marginTop: "20px",
    },
    drawerContainer: {
        overflow: 'auto',
    },
    sidebarItem: {
        paddingRight: "0",
    lineHeight: "5vh",
        height: "6vh",
    },
    sidebarText: {
        backgroundColor: "#FFFFFF",
        color: "#000000",
        fontWeight: "bold",
        padding: "20px",
        marginLeft: "24px",
        textAlign: "center",
        borderRadius: "20px 0px 0px 20px",
        background: "#f8f9fa",
        cursor: "pointer",
        '&:hover': {
            color: "white",
            background: "black",
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
            <List>
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
