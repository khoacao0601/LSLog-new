import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const defaultProps = {
    bgcolor: 'white',
    m: 1,
    style: { width: '356px', height: '413px' },
    borderColor: '#707070',
};

const useStyles = makeStyles({
    root: {
        // padding: '20px 20px 12px',
    },
})

export const RectangleTwo = () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <Box border={1} {...defaultProps}>
                    Warehouse Productivity
                </Box>
            </div>
        </div>
    )
}