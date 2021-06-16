import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setViews} from '../../store/reducer/topNavBarViewsControl';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        display: 'flex',
    },
    table: {
        minWidth: 700,
        marginTop: "2vh"
    },
    tableHead: {
        backgroundColor: "#eee",
    },
    row: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.background.default,
        },
        '&:hover': {
            backgroundColor: "#eee",
            cursor: "pointer",
        },
    },
    button:{
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(1),
        backgroundColor: "rgba(51,51,51,0.2)"
    },
    buttonDiv:{
        marginTop: "2vh"
    },
    searchBar: {
        marginRight: "24px",
        minWidth: "300px",
        height: "8.5px",
        "& >label": {
            transform: "translate(14px, 10px) scale(1)",
        },
        "& >div>input": {
            padding: "8.5px 14px",
        },
    },
   filter: {
        width: "11vh",
        marginLeft: "4vh"
    },
    sort: {
        width: "15vh",
        marginLeft: "4vh"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        background: "white",
        marginTop: "20px",
    },
}));

let id = 0;
function createData(prty, orderid, lines, status, created, expected, completed) {
  id += 1;
  return { id, prty, orderid, lines, status, created, expected, completed };
}

const rows = [
    createData('1', "R0005", "10", "Incomplete", "06/15/2021", "06/25/2021", "n/a"),
    createData('2', "R0006", "3", "Incomplete", "06/13/2021", "06/20/2021", "n/a"),
    createData('3', "R0007", "7", "Complete", "06/10/2021", "06/18/2021", "06/18/2021"),
];
 
const Orders = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [allOrders, setAllorders] = useState();

    const onClickCreateOrder = () => {
        dispatch(setViews("createOrder"));
    }

    const changeViewToOrderDetail = () => {
        dispatch(setViews("orderDetails"));
    }

    return(
        <main className={classes.content}>
            <Toolbar />
            <div className={classes.container}>
                <h1>Inbound / Orders</h1>
                <div className={classes.buttonDiv}>
                    <Button variant="outlined" className={classes.button} onClick={onClickCreateOrder}>CREATE ORDER</Button>
                    <Button variant="outlined" className={classes.button}>ACTIONS</Button>
                    <TextField className={classes.searchBar} id="globalSearchBar" label="Search Inbound Orders" variant="outlined" type="globalSearchBar"/>
                    <div className="w3-dropdown-hover">
                    <Button variant="outlined" className={classes.button}>FILTER &darr;</Button>
                        <div className="w3-dropdown-content w3-bar-block w3-card-4">
                            <div href="#" className="w3-bar-item w3-button">Filter 1</div>
                            <div href="#" className="w3-bar-item w3-button">Filter 2</div>
                            <div href="#" className="w3-bar-item w3-button">Filter 3</div>
                        </div>          
                    </div>
                    <div className="w3-dropdown-hover">
                    <Button variant="outlined" className={classes.button}>SORT &darr;</Button>
                        <div className="w3-dropdown-content w3-bar-block w3-card-4">
                            <div href="#" className="w3-bar-item w3-button">Sort 1</div>
                            <div href="#" className="w3-bar-item w3-button">Sort 2</div>
                            <div href="#" className="w3-bar-item w3-button">Sort 3</div>
                        </div>          
                    </div>
                </div>
            </div>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>PRTY</TableCell>
                            <TableCell align="center">ORDER ID</TableCell>
                            <TableCell align="center">LINES</TableCell>
                            <TableCell align="center">STATUS</TableCell>
                            <TableCell align="center">DATE CREATED</TableCell>
                            <TableCell align="center">DATE EXPECTED</TableCell>
                            <TableCell align="center">DATE COMPLETED</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id} onClick={changeViewToOrderDetail} className={classes.row}>
                            <TableCell component="th" scope="row">{row.prty}</TableCell>
                            <TableCell align="center">{row.orderid}</TableCell>
                            <TableCell align="center">{row.lines}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">{row.created}</TableCell>
                            <TableCell align="center">{row.expected}</TableCell>
                            <TableCell align="center">{row.completed}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        </main>
    )
}


export default Orders;