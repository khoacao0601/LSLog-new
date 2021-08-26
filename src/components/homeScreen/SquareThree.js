import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    squareThree: {
        // padding: '20px 21px 21.5px 18px',
    },
})

const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    style: { width: '728px', height: '413px' },
    borderColor: '#707070',
  };

export const SquareThree = () => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.squareThree}>
                <Box border={1} {...defaultProps}>
                    <h3>Labor Productivity</h3>
                    {/* <iframe
                        width="728"
                        height="413"
                        seamless
                        frameBorder="0"
                        scrolling="no"
                        src="http://ec2-44-197-47-243.compute-1.amazonaws.com:8088/superset/explore/?r=2&standalone=true&height=400"
                    /> */}
                </Box>
            </div>
        </div>
    )
}