/* eslint-disable eqeqeq */
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setViews} from '../../store/reducer/viewsControlSlice';
import { setOrderId } from '../../store/reducer/orderIDCslice';
import { useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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
    breadcrumbs: {
        fontSize: "2.5rem",
        "& >ol>li>p": {
            fontSize: "2.5rem",
        },
    },
}));


 
const Orders = () => {
    const classes = useStyles();

    const [allOrders, setAllorders] = useState([]);
    const [oredersFilter, setOrdersFilter] = useState([]);

    const history = useHistory();

    const onClickCreateOrder = () => {
        history.push('/Inbound/CreateOrder');
    }

    const api_url = `http://3.142.47.66:8141/v1/receiving-orders`;

    useEffect(() => {

        async function fetchPostList(){
            try {
                const requestUrl = api_url;
                const response = await fetch(requestUrl);
                //console.log(response);
            
                const responseJSON = await response.json();
                
                // console.log(responseJSON[0].positions[0].positionId);
                    setAllorders(responseJSON);
                    setOrdersFilter(responseJSON);

            } catch (error) {
                console.log('Failed to Fetch', error);
            } 
        }
        fetchPostList();

    }, [api_url]);

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
                hour = date.getUTCHours() - 12 + ":" + minutes + " PM";
            } else {
                hour = date.getUTCHours() + ":" + minutes + " AM";
            }
            //full formate for date time 
            const datePrint = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + hour;
            return datePrint;
        } else {
            return "N/A";
        }
    }

    //store OrderID to Redux Store and Change View to Order Details
    const storeOrderId = (orderId) => {
        //dispatch(setViews("orderDetails"));
        dispatch(setOrderId(orderId));
        history.push(`/Inbound/OrderDetails?number=${orderId}`);
    }

    //store OrderId from user input to Search Bar
    const searchBar= (e) => {
        setAllorders(oredersFilter.filter((val) => {
            if(e.target.value === ""){
                return val;
            } else if(val.orderId.toLowerCase().includes(e.target.value.toLowerCase())) {
               return val;
            }
        })
        )
    }

    //Breabcrumbs
    const dispatch = useDispatch();
    const handleView = (newView, event) => {
        event.preventDefault();
        dispatch(setViews(newView));
    };

    // Access the priority in the JSON Object
    const getPriority = (params) => {
        return `${params.row.positions[0].positionId}`
    }

    // Access the Lines in the JSON Object
    const getLines = (params) => {
        // console.log(params.row.positions.length)
        return `${params.row.positions.length}`
    }

    // Datagrid Columns
    // Field should match exactly as the json object has it(case-sensitive)
    const columns = [
        { 
            field: 'priority', 
            headerName: 'PRTY', 
            description: 'Order Priority', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center', 
            headerClassName: 'datagrid-header', 
            hide: false, 
            type: 'number', 
            valueGetter:getPriority,
            sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
        },
        { 
            field: 'orderId', 
            headerName: 'ORDER ID', 
            description: 'Order ID', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
            renderCell: (params) => (
                <strong>
                  {params.formattedValue}
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {storeOrderId(params.formattedValue)}}
                  >
                    Open
                  </Button>
                </strong>
              )
        },
        { 
            field: 'positions', 
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
        { field: 'state', headerName: 'STATUS', description: 'Status of Order', flex: 1, headerAlign: 'center', align: 'center',headerClassName: 'datagrid-header', hide: false,},
        { 
            field: 'createdDate', 
            headerName: 'DATE CREATED', 
            description: 'Date of Order Generation', 
            flex: 1,  
            align: 'center',
            headerAlign: 'center', 
            headerClassName: 'datagrid-header', 
            hide: false, 
            type: 'dateTime',
            valueFormatter: (params) =>{return convertDateTime(params.value)}
        },
        { 
            field: 'expectedDate', 
            headerName: 'DATE EXPECTED', 
            description: 'Date of Expected Receipt', 
            flex: 1,  
            align: 'center',
            headerAlign: 'center', 
            headerClassName: 'datagrid-header', 
            hide: false, 
            type: 'dateTime',
            valueFormatter: (params) =>{return convertDateTime(params.value)}
        },
        { 
            field: 'completedDate', 
            headerName: 'DATE COMPLETED', 
            description: 'Date of Actual Receipt', 
            flex: 1,  
            align: 'center',
            headerAlign: 'center', 
            headerClassName: 'datagrid-header', 
            hide: false, 
            type: 'dateTime',
            valueFormatter: (params) =>{return convertDateTime(params.value)}
        },
        { 
            field: '', 
            headerName: 'DELETE', 
            sortable: false, 
            width: 100, 
            description: 'Delete Line', 
            headerAlign: 'center', 
            align: 'center', 
            headerClassName: 'datagrid-header', 
            flex: 1,
            renderCell: (params) => { return <Icon style={{ fontSize: 35}}> delete</Icon>} 
        }
    ];

    let rows = oredersFilter.map(object=> (
            <TableRow
                key={object.orderId} 
                hover='true' 
                className={classes.row} 
                onClick={() => {storeOrderId(object.orderId)}}>
                <TableCell component="th" scope="row">{object.priority}</TableCell>
                <TableCell align="center">{object.orderId}</TableCell>
                <TableCell align="center">{object.positions.length}</TableCell>
                <TableCell align="center">{object.state}</TableCell>
                <TableCell align="center">{convertDateTime(object.createdDate)}</TableCell>
                <TableCell align="center">{convertDateTime(object.expectedDate)}</TableCell>
                <TableCell align="center">{convertDateTime(object.completedDate)}</TableCell>
            </TableRow>
    ))

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
                        onChange={searchBar}/>
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
        </main>
    )
}


export default Orders;