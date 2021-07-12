import React from 'react';
import {useSelector} from 'react-redux';
import {userInfoDataSelector} from '../store/reducer/usersControlSlice';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginLeft: theme.spacing(2),
    },
    flexGrow: 1,
  },
  paper: {height: 40,width: 100,},
  page: {marginTop: 20,},
  control: {padding: theme.spacing(2),},
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
      <div className="login-form w-25 mx-auto">
        <form>
            <Grid container spacing={3} className={classes.page}>
                <Grid item xs={12}>
                    <h2 className="text-center">My Account</h2>       
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3} justify="center" width={1}>
                    <Grid item xs={12} textAlign="left">
                      <h5 className="card-title">User Info - {userInfo.fullname}</h5>
                    </Grid>
                    <Grid item xs={12} textAlign="left">
                      <Typography><b>Username: </b>{userInfo.username}</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="left">
                      <Typography><b>Full Name: </b>{userInfo.fullname}</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="left">
                      <Typography><b>Description: </b>{userInfo.details.description}</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="left">
                      <Typography><b>Comment: </b>{userInfo.details.comment}</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="left">
                      <Typography><b>Phone number: </b>{userInfo.details.phoneNo}</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="left">
                      <Typography><b>IM: </b>{userInfo.details.im}</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="left">
                      <Typography><b>Office: </b>{userInfo.details.office}</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="left">
                      <Typography><b>Department: </b>{userInfo.details.department}</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="left">
                      <Typography><b>Gender: </b>{userInfo.details.gender}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Button variant="contained" color="primary">Edit Account</Button>
                  </Grid>
                </Grid>
            </Grid>
        </form>
      </div>
    )
}

export default Welcome;