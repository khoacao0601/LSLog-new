import React, {useEffect, useState} from 'react';
import createUserPic from '../images/LSLCreateUser1.png';
//included CSS, Boostrap, and W3.CSS library

import { makeStyles } from '@material-ui/core/styles';
//import { spacing } from '@material-ui/system';
import {useDispatch, useSelector} from 'react-redux';
import {setViews} from '../store/reducer/viewsControlSlice';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {margin: theme.spacing(1),marginLeft: theme.spacing(2),},flexGrow: 1,},
        paper: {height: 40,width: 100,},
        page: {marginTop: 20,},
        control: {padding: theme.spacing(2),},
    }));

const CreateUser = () => {
    const classes = useStyles();

    const [newUser, setNewUser] = useState({
        fullName: "",
        userName: "",
        email: "",
        password: "",
        phoneNumber: "",
        skype: "",
        office: "",
        dept: "",
        gender: ""
    })

    const [sendValue, setSendValue] = useState();

    //const [buttonStatus, setButtonStatus] = useState('');

    const updateField = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    //setup value for Post request
    useEffect(() => {
        console.log(newUser.fullName);
        setSendValue({
            username: newUser.userName,
            email: newUser.email
        })
    }, [newUser.email, newUser.userName, newUser.fullName])


    //do Post request
    const sendInfos = (e) => {
        console.log(JSON.stringify(sendValue));
        fetch('http://18.218.0.232:8110/uaa/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendValue)
          });
    }

    const dispatch = useDispatch();
    const setLogin = (event) => {
        event.preventDefault();
        dispatch(setViews('login'));
    }

    return(
        <div className="create-form w-50 mx-auto">
            <form onSubmit={sendInfos}>
                <Grid container spacing={3} className={classes.page}>
                    <Grid item xs={12}>
                        <img src={createUserPic} alt='front' style={styles.pic} className="w3-margin-top"/>
                    </Grid>
                    <Grid item xs={12}>
                    <h2 className="text-center">Create New User</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="center" width={1}>
                            <TextField fullWidth={true}
                                id="fullName"
                                label="FullName"
                                variant="outlined"
                                name="fullName"
                                value={newUser.fullName}
                                onChange={updateField}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="center" width={1}>
                            <TextField fullWidth={true}
                                id="username"
                                label="Username"
                                variant="outlined"
                                name="userName"
                                value={newUser.userName}
                                onChange={updateField}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="center" width={1}>
                            <TextField fullWidth={true}
                                id="email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={newUser.email}
                                onChange={updateField}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="center" width={1}>
                            <TextField fullWidth={true}
                                type="password"
                                id="password"
                                label="Password"
                                variant="outlined"
                                name="password"
                                value={newUser.password}
                                onChange={updateField}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="center" width={1}>
                            <TextField fullWidth={true}
                                id="phone"
                                label="Phone Number"
                                variant="outlined"
                                name="phoneNumber"
                                value={newUser.phoneNumber}
                                onChange={updateField}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="center" width={1}>
                            <TextField fullWidth={true}
                                id="skype"
                                label="Skype ID"
                                variant="outlined"
                                name="skype"
                                value={newUser.skype}
                                onChange={updateField}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="center" width={1}>
                            <TextField fullWidth={true}
                                id="office"
                                label="Office"
                                variant="outlined"
                                name="office"
                                value={newUser.office}
                                onChange={updateField}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="center" width={1}>
                        <FormControl fullWidth={true} variant="outlined" className={classes.formControl}>
                            <InputLabel id="dept-select-outlined-label">Department</InputLabel>
                            <Select
                                labelId="dept-select-outlined-label"
                                label="Department"
                                id="dept-select-outlined"
                                name="dept"
                                value={newUser.dept}
                                onChange={updateField}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={"Dep1"}>Dep. 1</MenuItem>
                                <MenuItem value={"Dep2"}>Dep. 2</MenuItem>
                                <MenuItem value={"Dep3"}>Dep. 3</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="center" width={1}>
                         <FormControl variant="outlined" className={classes.formControl} fullWidth={true}>
                            <InputLabel id="gender-select-outlined-label">Gender</InputLabel>
                            <Select
                                labelId="gender-select-outlined-label"
                                label="Gender"
                                id="gender-select-outlined"
                                name="gender"
                                value={newUser.gender}
                                onChange={updateField}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="center" width={1}>
                        <a href="login" onClick={setLogin}>Cancel</a>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="center" width={1}>
                            <Button fullWidth={true} type="submit" variant="contained" color="primary">Submit</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}


//React in file CSS object
let styles = {
    container: {
        border: 1,
        width: '45%',
        left: '28%',
        position: 'absolute',
        top: '8%',
        boxShadow: '30px 22px 45px grey',
        borderRadius: '8px'
    },
    pic: {
        width: '100%',
        height: '15vh'
    },
    iTag: {
        color: "red"
    }
}

export default CreateUser;