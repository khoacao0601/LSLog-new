import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { orderIdSelector } from '../../store/reducer/orderIDCslice';
//import './../../styling/orderDetails.css';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    componentTop: {
        display: "flex",
        marginTop: "24px",
    },
    grow: {
        flexGrow: 1,
    },
    table: {
        minWidth: 700,
        //marginTop: "2vh"
    },
    tableHead: {
        backgroundColor: "#eee",
    },
    row: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.background.default,
        },
        '&:hover': {
            backgroundColor: "#ccc",
            cursor: "pointer",
        },
    },
    button:{
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(1),
        backgroundColor: "#E0E0E0"
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
        marginTop: "60px",
    },
    tableCheck: {
        padding: "0",
        margin: "0",
        "& >span": {
            padding: "0",
            margin: "0",
        },
    },
}));



const OrderDetails = () => {
    const classes = useStyles();

    const orderId = useSelector(orderIdSelector)
    console.log(`Order ID:`, orderId)
    const url = `http://18.118.27.219:8141/v1/receiving-orders/?orderId=${orderId}`

    const [orderDetail, setOrderDetail] = useState([])

    const [state, setState] = useState({
        checkedB: false,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    
    useEffect(() => {
        async function getOrderDetail() {
            try{
                const requestUrl = url

                const res = await fetch(requestUrl);
                //console.log(`Response before JSON Conversion`, res);

                const resJSON = await res.json()
                //console.log(`Response AFTER JSON Conversion`, resJSON)

                setOrderDetail(resJSON.positions)
            }
            catch(err) {
                console.log('Failed to Fetch the Data', err);
            }
        }
        getOrderDetail()

    }, []);

    let tableBody = orderDetail.map((order) => 
        <TableRow key={order.positionId} className={classes.row}>
            <TableCell align="center">
                <FormControlLabel onChange={handleChange} className={classes.tableCheck}
                    control={<Checkbox checked={state.positionId}
                    name={"check_"+order.positionId} color="primary" />}/>
            </TableCell>
            <TableCell align="center">{order.positionId}</TableCell>
            <TableCell align="center">{order.product.description}</TableCell>
            <TableCell align="center">{order.quantityExpected}</TableCell>
            <TableCell align="center">{order.product.baseUnitUOM}</TableCell>
            <TableCell align="center">N/A</TableCell>
            <TableCell align="center">{order.state}</TableCell>
            <TableCell align="center">{order.quantityReceivedMagnitude}</TableCell>
            <TableCell align="center">{order.product.sku}</TableCell>
            <TableCell align="center">{order.transportUnitBK}</TableCell>
        </TableRow>
    )

    return (
        <main className={classes.content}>
            <Toolbar />
            <div className='container-order'>
                <h1>Inbound / Orders / {orderId} </h1>
                <div className={classes.componentTop}>
                    <div className=""></div>
                    <div className="w3-dropdown-hover">
                    <Button variant="outlined" className={classes.button}>ACTIONS &darr;</Button>
                        <div className="w3-dropdown-content w3-bar-block w3-card-4">
                            <div href="#" className="w3-bar-item w3-button">Action 1</div>
                            <div href="#" className="w3-bar-item w3-button">Action 2</div>
                            <div href="#" className="w3-bar-item w3-button">Action 3</div>
                        </div>          
                    </div>                    <div className={classes.grow} />
                    <TextField className={classes.searchBar} id="globalSearchBar" label={"Search Order "+orderId} variant="outlined" type="globalSearchBar"/>
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
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">Line</TableCell>
                            <TableCell align="center">Item</TableCell>
                            <TableCell align="center">QTY</TableCell>
                            <TableCell align="center">UOM</TableCell>
                            <TableCell align="center">Total Ea</TableCell>
                            <TableCell align="center">STATUS</TableCell>
                            <TableCell align="center">Qty Rcvd</TableCell>
                            <TableCell align="center">SKU</TableCell>
                            <TableCell align="center">TRANSPORT UNIT BK</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { tableBody }
                    </TableBody>
                </Table>
            </Paper>
        </main>
    )
}

export default OrderDetails;
