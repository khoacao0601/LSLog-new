import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    sideBar: {
        width: '256px',
        height: '1000px',
        padding: '40px 0 0',
        boxShadow: '4px 0 10px 0 rgba(0,0,0, 0.16)',
        bgcolor: 'black',
    },
}))

export const SideNavTwo = () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.sideBar}>
                <Box>
                    <h3>Dashboard</h3>
                    <h3>Dashboard</h3>
                    <h3>Dashboard</h3>
                    <h3>Dashboard</h3>
                    <h3>Dashboard</h3>
                    <h3>Dashboard</h3>
                </Box>
            </div>
        </div>
    )
}
