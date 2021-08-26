import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    squareTwo: {
        // padding: '20px 20px 122px',
    },
})

const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    style: { width: '480px', height: '413px' },
    borderColor: '#707070',
    marginTop: '80px',
};

export const SquareTwo = () => {
    const classes= useStyles()
    return (
        <div>
            <div className={classes.squareTwo}>
                <Box border={1} {...defaultProps} >
                    <h3>Inventory Status</h3>
                </Box>
            </div>
        </div>
    )
}