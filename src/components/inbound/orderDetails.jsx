import React, { useEffect, useState } from 'react'
import './../../styling/orderDetails.css'

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


const OrderDetails = () => {
    const classes = useStyles();

    const url = 'http://3.14.130.41:8141/v1/receiving-orders/?orderId=1025'

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        async function getOrderDetail() {
            try{
                const requestUrl = url

                const res = await fetch(requestUrl);
                console.log(`Response before JSON Conversion`, res);

                const resJSON = await res.json()
                console.log(`Response AFTER JSON Conversion`, resJSON)

                setOrderDetail(resJSON.positions)
            }
            catch(err) {
                console.log('Failed to Fetch the Data', err);
            }
        }
        getOrderDetail()

    }, []);

    let tableBody = orderDetail.map((order) => 
        <tr className='table-row'>
            <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">
                {order.positionId}
            </td>
            <td>
                {order.product.description}
            </td>
            <td>
                {order.quantityExpected}
            </td>
            <td>
                {order.product.baseUnitUOM}
            </td>
            <td>
                N / A
            </td>
            <td>
                {order.state}
            </td>
            <td>
                {order.quantityReceivedMagnitude}
            </td>
            <td>
                {order.product.sku}
            </td>
            <td>
                {order.transportUnitBK}
            </td>
        </tr>
    )

    return (
        <main className={classes.content}>
            <Toolbar />
            <div className='container-order'>
                <h1>Inbound / Orders / R0005 </h1>
                <div className='component-top'>
                    <Button variant="outlined" className={classes.button}>ACTIONS</Button>
                    <TextField className={classes.searchBar} id="globalSearchBar" label="Search Order R0005" variant="outlined" type="globalSearchBar"/>
                    <div className="w3-dropdown-hover">
                    <Button variant="outlined" className={classes.button}>FILTER &darr;</Button>
                        <div className="w3-dropdown-content w3-bar-block w3-card-4">
                            <div href="#" className="w3-bar-item w3-button">Filter 1</div>
                            <div href="#" className="w3-bar-item w3-button">Filter 2</div>
                            <div href="#" className="w3-bar-item w3-button">Filter 3</div>
                        </div>          
                    </div>
                </div>
                <table className='table-container'>
                <tr className="table-row d-flex justify-content-between">
                    <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">Line</th>
                    <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">Item</th>
                    <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">QTY</th>
                    <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">UOM</th>
                    <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">Total Ea</th>
                    <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">Status</th>
                    <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">Qty Rcvd</th>
                    <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">SKU</th>
                </tr>
                <tbody className='table-body'>
                    { tableBody }
                </tbody>
                </table>
            </div>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell align="center">Line</TableCell>
                            <TableCell align="center">Item</TableCell>
                            <TableCell align="center">QTY</TableCell>
                            <TableCell align="center">UOM</TableCell>
                            <TableCell align="center">Total Ea</TableCell>
                            <TableCell align="center">STATUS</TableCell>
                            <TableCell align="center">Qty Rcvd</TableCell>
                            <TableCell align="center">SKU</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    </TableBody>
                </Table>
            </Paper>
        </main>
    )
}

export default OrderDetails;
