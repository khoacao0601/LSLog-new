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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        background: "white",
        marginTop: "60px",
        width: "24%",
        position: "absolute",
        left: "38%",
    },
}));

const Contact = () => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Grid container spacing={3} className={classes.page}>
            <Grid item xs={12}>
                    <h2 className="text-center">Contact Us</h2>       
                </Grid>
                <Grid item xs={12}>
                    <Grid justify="center" spacing={spacing} width={1}>
                        <Typography variant="body1" gutterBottom>
                            <strong>Life Science Logistics </strong>Let us know how we can say “yes”. We’re here to answer any and every question you have. Simply give us a call or fill out the fields below and we’ll be in contact with you shortly.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            2600 Regent Blvd. DFW Airport, TX 75261
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid justify="center" spacing={spacing} width={1}>
                        <Typography variant="body1" paragraph>
                            <strong>CALL</strong><br/>
                            469.844.3700<br/>
                            888.844.9363
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>EMAIL</strong><br/>
                            inquiries@lslog.com
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid justify="center" spacing={spacing} width={1}>
                        <Typography variant="body1" paragraph>
                            <strong>MAIL</strong><br/>
                            LifeScience Logistics<br/>
                            P.O. Box 612226<br/>
                            DFW Airport, TX 75261
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>BUSINESS DEVELOPMENT</strong><br/>
                            bd@lslog.com<br/>
                            469.844.3699
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Contact;