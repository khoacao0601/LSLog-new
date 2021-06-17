import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setViews} from '../../store/reducer/topNavBarViewsControl';
import { setOrderId } from '../../store/reducer/orderIDCslice';

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
        marginTop: theme.spacing(3),
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


 
const Orders = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [allOrders, setAllorders] = useState([]);

    const onClickCreateOrder = () => {
        dispatch(setViews("createOrder"));
    }

    const api_url = `http://18.118.27.219:8141/v1/receiving-orders`;

    useEffect(() => {
        async function fetchPostList(){
            try {
                const requestUrl = api_url;
                const response = await fetch(requestUrl);
                //console.log(response);
            
                const responseJSON = await response.json();
                
                //console.log(responseJSON);
                setAllorders(responseJSON);
                
                
            } catch (error) {
                console.log('Failed to Fetch', error);
            } 
        }
        fetchPostList();
    
    }, []);

    //change Format of Date and Time 
    const convertDateTime = (dateTime) => {
        if(dateTime) {
            let hour = null;
            const date = new Date(dateTime);
            if(date.getUTCHours() >= 12){
                hour = date.getUTCHours() - 12 + ":" + date.getUTCMinutes() + " AM";
            } else {
                hour = date.getUTCHours + ":" + date.getUTCMinutes() + " AM";
            }
            const datePrint = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + "  " + hour;
            return datePrint;
        } else {
            return "N/A"
        }
    }

    //store OrderID to Redux Store and Change View to Order Details
    const storeOrderId = (orderId) => {
        dispatch(setViews("orderDetails"));
        dispatch(setOrderId(orderId));
    }

    return(
        <main className={classes.content}>
            <Toolbar />
            <div className={classes.container}>
                <h1>Inbound / Orders</h1>
                <div className={classes.buttonDiv}>
                    <Button variant="outlined" className={classes.button} onClick={onClickCreateOrder}>CREATE ORDER</Button>
                    <Button variant="outlined" className={classes.button}>ACTIONS</Button>
                    <TextField 
                        className={classes.searchBar} 
                        id="globalSearchBar" 
                        label="Search Inbound Orders" 
                        variant="outlined" 
                        type="globalSearchBar"/>
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
                    {allOrders.map(object=> (
                        <TableRow key={object.orderId}  className={classes.row} onClick={() => {storeOrderId(object.orderId)}}>
                            <TableCell component="th" scope="row">{object.priority}</TableCell>
                            <TableCell align="center">{object.orderId}</TableCell>
                            <TableCell align="center">{object.positions[0].positionId}</TableCell>
                            <TableCell align="center">{object.state}</TableCell>
                            <TableCell align="center">{convertDateTime(object.createdDate)}</TableCell>
                            <TableCell align="center">{convertDateTime(object.expectedDate)}</TableCell>
                            <TableCell align="center">{convertDateTime(object.completedDate)}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        </main>
    )
}


export default Orders;