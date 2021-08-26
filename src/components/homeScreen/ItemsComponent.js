import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    rectangleOne: {
        // padding: '20px 19.5px 26px 20px',
    },
})

const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    style: { width: '356px', height: '878px' },
    borderColor: '#707070',
    marginLeft: '90px',
    marginTop: '80px',
  };

export const ItemsComponent = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.rectangleOne}>
                <Box border={1} {...defaultProps} >
                    <h2>Today: 01/01/21</h2>
                </Box>
            </div>
        </div>
    )
}
