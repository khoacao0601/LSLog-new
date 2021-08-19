import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        background: "white",
        marginTop: "60px",
    },
}));

const Dashboard = () => {
    const classes = useStyles();

    return(
        <main className={classes.content}>
            <Toolbar />
            <div className={classes.container}>
                <h1>Page under construction - Dashboard</h1>
            </div>
        </main>
    )
}

export default Dashboard;