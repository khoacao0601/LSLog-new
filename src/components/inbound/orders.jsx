/* eslint-disable eqeqeq */
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
import{ DataGrid } from '@material-ui/data-grid';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
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
        marginTop: "3vh",
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
}));


 
const Orders = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [allOrders, setAllorders] = useState([]);

    const onClickCreateOrder = () => {
        dispatch(setViews("createOrder"));
    }

    const api_url = `http://3.141.28.243:8141/v1/receiving-orders`;

    useEffect(() => {

        async function fetchPostList(){
            try {
                const requestUrl = api_url;
                const response = await fetch(requestUrl);
                //console.log(response);
            
                const responseJSON = await response.json();
                
                // console.log(responseJSON[0].positions[0].positionId);
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
            let minutes = null;
            const date = new Date(dateTime);
            //format minutes
            if(date.getUTCMinutes() === 0){
                minutes = date.getUTCMinutes() + "0";
            } else {
                minutes = date.getUTCMinutes();
            }   
            //format hours
            if(date.getUTCHours() >= 12){
                hour = date.getUTCHours() - 12 + ":" + minutes + " AM";
            } else {
                hour = date.getUTCHours + ":" + minutes + " AM";
            }
            //full formate for date time 
            const datePrint = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + "  " + hour;
            return datePrint;
        } else {
            return "N/A";
        }
    }

    //store OrderID to Redux Store and Change View to Order Details
    const storeOrderId = (orderId) => {
        dispatch(setViews("orderDetails"));
        dispatch(setOrderId(orderId));
    }

    //store OrderId from user input to Search Bar
    const orderIdState = (e) => {
        //debugger;
        console.log(e.target.value);
    }


    // Access the priority in the JSON Object
    const getPriority = (params) => {
        return `${params.row.positions[0].positionId}`
    }

    // Access the Lines in the JSON Object
    const getLines = (params) => {
        // console.log(params)
        return `${params.row.positions[0].quantityExpectedMagnitude}`
    }

    // Datagrid Columns
    // Field should match exactly as the json object has it(case-sensitive)
    const columns = [
        { field: 'priority', headerName: 'PRTY', description: 'Order Priority', flex: 1,  headerAlign: 'center', align: 'center', headerClassName: 'datagrid-header', hide: false, type: 'number', valueGetter:getPriority,
        sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),},
        { field: 'orderId', headerName: 'ORDER ID', description: 'Order ID', flex: 1,  headerAlign: 'center', align: 'center',headerClassName: 'datagrid-header', hide: false, },
        { field: 'positions', headerName: 'LINES', description: 'Lines in Order', flex: 1,  headerAlign: 'center', align: 'center',headerClassName: 'datagrid-header', hide: false, type: 'number',
        valueFormatter: getLines },
        { field: 'state', headerName: 'STATUS', description: 'Status of Order', flex: 1, headerAlign: 'center', align: 'center',headerClassName: 'datagrid-header', hide: false,},
        { field: 'createdDate', headerName: 'DATE CREATED', description: 'Date of Order Generation', flex: 1,  align: 'center',headerAlign: 'center', headerClassName: 'datagrid-header', hide: false, type: 'dateTime',
        valueFormatter: (params) =>{return convertDateTime(params.value)}},
        { field: 'expectedDate', headerName: 'DATE EXPECTED', description: 'Date of Expected Receipt', flex: 1,  align: 'center',headerAlign: 'center', headerClassName: 'datagrid-header', hide: false, type: 'dateTime',
        valueFormatter: (params) =>{return convertDateTime(params.value)}},
        { field: 'completedDate', headerName: 'DATE COMPLETED', description: 'Date of Actual Receipt', flex: 1,  align: 'center',headerAlign: 'center', headerClassName: 'datagrid-header', hide: false, type: 'dateTime',
        valueFormatter: (params) =>{return convertDateTime(params.value)}},
        { field: '', headerName: 'DELETE', sortable: false, width: 100, description: 'Delete Line', headerAlign: 'center', align: 'center', headerClassName: 'datagrid-header', flex: 1, align: 'center', renderCell: (params) => { return <Icon style={{ fontSize: 35}}> delete</Icon>} },
    ];

    let rows = allOrders.map(object=> (
            <TableRow hover='true' className={classes.row} onClick={() => {storeOrderId(object.orderId)}}>
                <TableCell component="th" scope="row">{object.priority}</TableCell>
                <TableCell align="center">{object.orderId}</TableCell>
                <TableCell align="center">{object.positions[0].positionId}</TableCell>
                <TableCell align="center">{object.state}</TableCell>
                <TableCell align="center">{convertDateTime(object.createdDate)}</TableCell>
                <TableCell align="center">{convertDateTime(object.expectedDate)}</TableCell>
                <TableCell align="center">{convertDateTime(object.completedDate)}</TableCell>
            </TableRow>
    ))
    // Testing Data SImply to ensure styling is accurate
    const testData = [
        {
            id: '1',
            prty: '1',
            orderID: 'R0022',
            lines: '3',
            Status: 'PENDING',
            DateCreated: '05/11/21 12:30AM',
            DateExpected: '06/30/21 09:30AM',
            DateCompleted: '07/07/21 10:45PM',
        },
        {
            id: '2',
            prty: '10',
            orderID: 'R0011',
            lines: '33',
            Status: 'INCOMPLETE',
            DateCreated: '05/11/21 12:30AM',
            DateExpected: '06/30/21 09:30AM',
            DateCompleted: '07/07/21 10:45PM',
        },
        {
            id: '3',
            prty: '6',
            orderID: 'R0001',
            lines: '19',
            Status: 'PENDING',
            DateCreated: '05/11/21 12:30AM',
            DateExpected: '06/30/21 09:30AM',
            DateCompleted: '07/07/21 10:45PM',
        },
        {
            id: '4',
            prty: '4',
            orderID: 'R0055',
            lines: '303',
            Status: 'INCOMPLETE',
            DateCreated: '05/11/21 12:30AM',
            DateExpected: '06/30/21 09:30AM',
            DateCompleted: '07/07/21 10:45PM',
        },
        {
            id: '5',
            prty: '2',
            orderID: 'R00220',
            lines: '3',
            Status: 'PENDING',
            DateCreated: '05/11/21 12:30AM',
            DateExpected: '06/30/21 09:30AM',
            DateCompleted: '07/07/21 10:45PM',
        },
        {
            id: '6',
            prty: '3',
            orderID: 'R00110',
            lines: '33',
            Status: 'COMPLETE',
            DateCreated: '05/11/21 12:30AM',
            DateExpected: '06/30/21 09:30AM',
            DateCompleted: '07/07/21 10:45PM',
        },
        {
            id: '7',
            prty: '7',
            orderID: 'R00010',
            lines: '19',
            Status: 'PENDING',
            DateCreated: '05/11/21 12:30AM',
            DateExpected: '06/30/21 09:30AM',
            DateCompleted: '07/07/21 10:45PM',
        },
        {
            id: '8',
            prty: '8',
            orderID: 'R00550',
            lines: '303',
            Status: 'PENDING',
            DateCreated: '05/11/21 12:30AM',
            DateExpected: '06/30/21 09:30AM',
            DateCompleted: '07/07/21 10:45PM',
        },
    ]



    return(
        <main className={classes.content}>
            <Toolbar />
            <div className={classes.container}>
                <h1>Inbound / Orders</h1>
                <div className={classes.componentTop}>
                    <Button variant="outlined" className={classes.button} onClick={onClickCreateOrder}>CREATE ORDER</Button>
                    <div className="w3-dropdown-hover">
                    <Button variant="outlined" className={classes.button}>ACTIONS &darr;</Button>
                        <div className="w3-dropdown-content w3-bar-block w3-card-4">
                            <div href="#" className="w3-bar-item w3-button">Action 1</div>
                            <div href="#" className="w3-bar-item w3-button">Action 2</div>
                            <div href="#" className="w3-bar-item w3-button">Action 3</div>
                        </div>          
                    </div>
                    <div className={classes.grow} />
                    <TextField 
                        className={classes.searchBar} 
                        id="globalSearchBar" 
                        label="Search Inbound Orders" 
                        variant="outlined" 
                        type="globalSearchBar"
                        name="orderId"
                        
                        onChange={orderIdState}/>
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
                <DataGrid className={classes.root_two} align='center' rows={allOrders} columns={columns} pageSize={20} getRowId={(row) => row.pKey } checkboxSelection>
                    {rows}
                </DataGrid>
            </div>

            
            {/* <Paper className={classes.root}>
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
            </Paper> */}
        </main>
    )
}


export default Orders;