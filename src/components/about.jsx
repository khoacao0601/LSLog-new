/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
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

const About = () => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Grid container spacing={3} className={classes.page}>
            <Grid item xs={12}>
                    <h2 className="text-center">About Us</h2>       
                </Grid>
                <Grid item xs={12}><Grid container justify="center" spacing={spacing} width={1}>
                <p><strong>Life Science Logistics </strong>is committed to offering the highest quality, flexibility, and compliance in healthcare supply chain solutions.
                We offer a wide range of customizable solutions, including pharmaceutical and medical device 3PL warehousing, distribution, order-to-cash management, title model services, and quality assurance and regulatory support.  Our highly secure, cGMP-compliant, facilities allow our clients to distribute frozen, refrigerated and controlled room temperature products, while outsourcing as much of the process as they desire. Life Science Logistics is Board of Pharmacy-licensed, VAWD-accredited, cGMP-compliant and FDA-registered.  Our can-do attitude sets us apart from our competition, and we pride ourselves on bringing the best technology, quality and intellectual capital to our clients.</p>
                </Grid></Grid>
            </Grid>
        </div>
    )
}

export default About;