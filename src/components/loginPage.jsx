/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState}from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUsers, usersSelector, setUserInData} from '../store/reducer/usersControlSlice';
import {setViews} from '../store/reducer/viewsControlSlice';

import { makeStyles } from '@material-ui/core/styles';
//import { spacing } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import { CallMissedSharp } from '@material-ui/icons';
//import Box from '@material-ui/core/Box';
//import Link from '@material-ui/core/Link';
//import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {margin: theme.spacing(1),marginLeft: theme.spacing(2),},flexGrow: 1,},
        paper: {height: 40,width: 100,},
        page: {marginTop: 20,},
        control: {padding: theme.spacing(2),},
    }));


const Login = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const [inputUserName, setInputUserName] = useState('');
    const [userName, setUserName] = useState([]);
    const [userStatus, setUserStatus] = useState('');

    const dispatch = useDispatch();

    const allUsers = useSelector(usersSelector);

    const api_url = `http://3.139.83.37:8110/uaa/users`;

    const [state, setState] = useState({
        checkedB: false,
      });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    
    useEffect(() => {
        async function fetchPostList(){
            try {
                const requestUrl = api_url;
                const response = await fetch(requestUrl);
                //console.log(response);
            
                const responseJSON = await response.json();
                
                console.log(responseJSON);
                
                dispatch(setUsers(responseJSON));                
                //Clear data to get Username Only
                let newUsersName = [];
                for(let i = 0; i < responseJSON.length; i++){
                    newUsersName.push(responseJSON[i].username)
                 }
                 setUserName([...userName, newUsersName]);

                 //console.log(newUsersName);
            } catch (error) {
                console.log('Failed to Fetch', error);
            } 
        }
        fetchPostList();
    
    }, []);

    const getInputUserName = (event) => {
        setInputUserName(event.target.value);
    } 

    const checkUserName = (event) => {
        //debugger;
        event.preventDefault();
        //console.log(userName);
        let statusCheckPoint = ''; // if we match user name don't run Status

                for(let x = 0; x < allUsers.length; x++){
                    if(allUsers[x].username === inputUserName ){
                        //console.log(allUsers[i]);
                        dispatch(setUserInData(allUsers[x]));
                        dispatch(setViews('welcome')); 
                        setUserStatus(''); //remove status after fail login
                        statusCheckPoint = 'welcome';
                        //break the loop so you don't need to loop through the rest when you get it
                        break; 
                    }
                }
        if(statusCheckPoint === '') {
            setUserStatus("Username is not available");
        }  
    }
    //set state to direct to Create Acc page
    const setCreateAcc = (event) => {
        event.preventDefault();
        dispatch(setViews('createAcc'));
    }

    return(
        <div className="login-form w-25 mx-auto">
            <form onSubmit={checkUserName}>
                <Grid container spacing={3} className={classes.page}>
                <Grid item xs={12}>
                        <h2 className="text-center">Log in</h2>       
                    </Grid>
                    <Grid item xs={12}><Grid container justify="center" width={1}>
                            <TextField fullWidth={true} id="username" label="Username" variant="outlined" value={inputUserName} onChange={getInputUserName} required />
                    </Grid></Grid>
                    <Grid item xs={12}><Grid container justify="center">
                            <TextField fullWidth={true} id="password" label="Password" variant="outlined" type="password" autoComplete="current-password"/>
                    </Grid></Grid>
                    <Grid item xs={12}><Grid container justify="center">
                            <p style={{color:'red'}}>{userStatus}</p>
                    </Grid></Grid>
                    <Grid item xs={12}><Grid container justify="center">
                            <Button fullWidth={true} type="submit" variant="contained" color="primary">Log in</Button>
                    </Grid></Grid>
                    <Grid item xs={12}><Grid container justify="left">
                            <FormControlLabel onChange={handleChange} control={<Checkbox checked={state.checkedB} name="checkedB" color="primary" />}label="Remember me"/>
                    </Grid></Grid>
                    <Grid item xs={6}><Grid container justify="center">
                            <a href="#" onClick={handleClickOpen}>Forgot password?</a>
                    </Grid></Grid>
                    <Grid item xs={6}><Grid container justify="center">
                            <a href="createAccount" onClick={setCreateAcc}>Create an Account</a>
                    </Grid></Grid>
                </Grid>
            </form>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Forgot Your Password?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Please enter your email address and we will send instructions to retreive or create a new password.
                </DialogContentText>
                <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                Submit
                </Button>
            </DialogActions>
        </Dialog>
      </div>
    )
}

export default Login;
