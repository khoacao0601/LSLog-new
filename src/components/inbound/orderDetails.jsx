import React, { useEffect, useState } from 'react';
import { orderIdSelector } from '../../store/reducer/orderIDCslice';
import {useDispatch, useSelector} from 'react-redux';
import {setViews} from '../../store/reducer/topNavBarViewsControl';
import {useParams, useRouteMatch} from 'react-router-dom';
//import './../../styling/orderDetails.css';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Toolbar from '@material-ui/core/Toolbar';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';
//import Typography from '@material-ui/core/Typography';
//import Breadcrumbs from '@material-ui/core/Breadcrumbs';
//import Link from '@material-ui/core/Link';
import{ DataGrid } from '@material-ui/data-grid';
import Icon from '@material-ui/core/Icon';

// STYLING
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        display: 'flex',
    },
    // Data Grid Column Header Styling Class
    root_two: {
        '& .datagrid-header': {
            backgroundColor: '#eee',
        },
        '& > *': {margin: theme.spacing(1),},
        width: 'auto',
        marginTop: theme.spacing(3),
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
        position: "absolute",
        left: "11vw",
        width: "90vw",
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
    // FUNCTIONS
    // Access the Lines in the JSON Object
    const getLines = (params) => {
        return params.id
        // return `${params.row.positions[0].quantityExpectedMagnitude}`
    }

    const getDesc = params => {
        return params.row.product.description
    }

    const getQuantity = params => {
        return params.row.quantityExpectedMagnitude
    }

    const getSKU = params => {
        return params.row.product.sku
    }


    // Datagrid Columns
    // Field should match exactly as the json object has it(case-sensitive)
    const columns = [
        { 
            field: 'positionId', 
            headerName: 'LINES', 
            description: 'Lines in Order', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
            type: 'number',
            valueFormatter: getLines,
            sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
        },
        { 
            field: 'description', 
            headerName: 'DESCRIPTION', 
            description: 'Product Name', 
            flex: 1, 
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
            type: 'string',
            valueFormatter: getDesc, 
            // sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
        },
        {
            field: 'quantityExpected',
            headerName: 'QTY',
            description: 'Item Quantity',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'datagrid-header',
            hide: false,
            type: 'number',
            valueFormatter: getQuantity,
            // sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),

            
        },
        {
            field: 'quantityReceivedUOM',
            headerName: 'UOM',
            description: 'Unit of Measurement',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'datagrid-header',
            hide: false,
            type: 'string'
        },
        {
            field: 'state',
            headerName: 'STATUS',
            description: 'Order Status',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'datagrid-header',
            hide: false,
        },
        {
            field: 'quantityReceivedMagnitude',
            headerName: 'QTY RCVD',
            description: 'Quantity Received',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'datagrid-header',
            hide: false
        },
        { 
            field: 'sku', 
            headerName: 'SKU', 
            description: 'SKU', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
            valueFormatter: getSKU,
        },
        { field: '', headerName: 'DELETE', sortable: false, width: 100, description: 'Delete Line', headerAlign: 'center', align: 'center', headerClassName: 'datagrid-header', flex: 1, align: 'center', renderCell: (params) => { return <Icon style={{ fontSize: 35}}> delete</Icon>} },
    ];

const OrderDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    //const params = useParams();

   

    
    console.log(useParams());
    //console.log(props);

    const orderId = useSelector(orderIdSelector)
    //because the OrderId will remove when user refresh the page
    //so i take the param orderId number for the API URL
    //so user can refresh the page but we still get the value from URL params, because React Router keep we on the same Route 
    const paramURL = window.location.href;
    var urltest = new URL(paramURL);
    var paramOnly = urltest.searchParams.get("number");
   // console.log(`Order ID:`, orderId)
    const url = `http://3.142.47.66:8141/v1/receiving-orders/?orderId=${paramOnly}`

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

    let rows = orderDetail.map((order) => 
        <TableRow key={order.positionId} className={classes.row}>
            <TableCell align="center">
                <FormControlLabel onChange={handleChange} className={classes.tableCheck}
                    control={<Checkbox checked={state.positionId}
                    name={"check_"+order.positionId} color="primary" />}/>
            </TableCell>
            <TableCell align="center">{order.positionId}</TableCell>
            <TableCell align="center">{order.product.description}</TableCell>
            <TableCell align="center">{order.quantityExpected}</TableCell>
            <TableCell align="center">{order.quantityReceivedUOM}</TableCell>
            <TableCell align="center">{order.state}</TableCell>
            <TableCell align="center">{order.quantityReceivedMagnitude}</TableCell>
            <TableCell align="center">{order.product.sku}</TableCell>
            <TableCell align="center">{order.transportUnitBK}</TableCell>
        </TableRow>
    )

    return (
        <main className={classes.content}>
            <Toolbar />
          
            <h1>Inbound/ Order #: {paramOnly}</h1>
           
            <div className='container-order'>
                {/*<h1>Inbound / Orders / {orderId} </h1>*/}
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

            <div style={{ height: 700, width: 'auto', display:'flex', justifyContent:'center', }}>
                <DataGrid className={classes.root_two} align='center' rows={orderDetail} columns={columns} pageSize={20} getRowId={(row) => row.positionId } checkboxSelection>
                    {rows}
                </DataGrid>
            </div>
        </main>
    )
}

export default OrderDetails;
