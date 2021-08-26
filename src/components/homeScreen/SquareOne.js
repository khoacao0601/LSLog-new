import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    style: { width: '604px', height: '413px' },
    borderColor: '#707070',
    marginTop: '80px',
};

  const useStyles = makeStyles((theme) => ({
    firstSquare: {
        // padding: '20px 26px 50px 20px',
    },
  }))

export const FirstSquare = () => {
    const classes = useStyles()
    return (
        <div>
            <div className={classes.firstSquare}>
                <Box border={1} {...defaultProps} >
                    <h3>Warehouse Utilization</h3>
                </Box>
            </div>
        </div>
    )
}