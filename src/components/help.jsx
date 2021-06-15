/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {margin: theme.spacing(1),marginLeft: theme.spacing(2),},flexGrow: 1,},
        paper: {height: 40,width: 100,},
        page: {marginTop: 20,},
        control: {padding: theme.spacing(2),},
    }));

const Help = () => {
    const classes = useStyles();
    return (
        <div className="login-form w-50 mx-auto">
            <Grid container spacing={3} className={classes.page}>
                <Grid item xs={12}>
                        <h2 className="text-center">Help</h2>       
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing} width={1}>
                        <Typography variant="body1" paragraph>
                            <strong>Life Science Logistics</strong><br/>
                            LET’S TALK ABOUT YOUR GOALS<br/>
                            Business Development<br/>
                            bd@lslog.com<br/>
                            888.844.3699
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Help;