import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {useSelector} from 'react-redux';
import {userInfoDataSelector} from '../store/reducer/usersControlSlice';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Welcome = () => {
    const classes = useStyles();
    const userInfo = useSelector(userInfoDataSelector);

    return (
        <div className={classes.root}>
            <Drawer variant="permanent" className={classes.drawer}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
                </div>
            </Drawer>            
            <div className={classes.content}>
                <h1 className="w-50 mx-auto ">Welcome to LSLog main page</h1>
                <h2 className="w-25 mx-auto">Hello {userInfo.fullname}</h2>
                <div className="card w-50 mx-auto shadow-lg p-3 mb-5 bg-white rounded" style={{width:'18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">User Info Card</h5>
                        <p className="card-text"><b>pKey:</b> {userInfo.pKey}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Username: </b>{userInfo.username}</li>
                        <li className="list-group-item"><b>Full Name: </b>{userInfo.fullname}</li>
                        <li className="list-group-item"><b>Description: </b>{userInfo.details.description}</li>
                        <li className="list-group-item"><b>Comment: </b>{userInfo.details.comment}</li>
                        <li className="list-group-item"><b>Phone number: </b>{userInfo.details.phoneNo}</li>
                        <li className="list-group-item"><b>IM: </b>{userInfo.details.im}</li>
                        <li className="list-group-item"><b>Office: </b>{userInfo.details.office}</li>
                        <li className="list-group-item"><b>Department: </b>{userInfo.details.department}</li>
                        <li className="list-group-item"><b>Gender: </b>{userInfo.details.gender}</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Welcome;