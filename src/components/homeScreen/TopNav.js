import React, {useState, useEffect} from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme) => ({
    topNav: {
        width: '1920px',
        height: '80px',
        padding: '16px 18px 12px 12px',
        boxShadow: '0 4px 10px 0 rgba(0,0,0, 0.16)',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'space-around',
    },
    middleNav:{
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
    },
    searchBar: {
        width: '728px',
    },
    leftNav: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexGrow: 2,
        // backgroundColor: 'yellow'
    },
    rightNav: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexGrow: 2,
        // backgroundColor: 'yellow'
    },
}))

export const TopNav = () => {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.topNav}>
            <Box className={classes.leftNav}>
                <Button aria-controls='fade-menu' aria-haspopup='true' onClick={handleClick}>LifeScience Logistics</Button>
                <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}>WavePlan</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Box>
            <Box>
                <form className={classes.middleNav}>
                    <TextField className={classes.searchBar} id='outlined-secondary' label='Global Search' variant='outlined' color='secondary' />
                </form>
            </Box>
            <Box className={classes.rightNav}>
                <Button aria-controls='fade-menu' aria-haspopup='true' onClick={handleClick}>FirstName LastName</Button>
                <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Box>
        </div>
    )
}
