import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ItemsComponent } from './ItemsComponent'
import { FirstSquare } from './SquareOne'
import { SquareTwo } from './SquareTwo';
import { RectangleTwo } from './RectangleTwo';
import { SquareThree } from './SquareThree';
import { SideNavTwo } from './SideNavTwo';
import { TopNav } from './TopNav';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    two: {
        display: 'flex',
        flexDirection: 'row',
    },
    four: {
        display: 'flex',
        flexDirection: 'row',
        // border: '1px solid orange',
        flexWrap: 'wrap',
    }
}))

export const MainHome = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TopNav />
            <div className={classes.two}>
                <SideNavTwo />
                {/* <h1>Dashboard</h1> */}
                <ItemsComponent/>
                <div className={classes.four}>
                    <FirstSquare />
                    <SquareTwo />
                    <RectangleTwo />
                    <SquareThree />
                </div>
            </div>
        </div>
    )
}
