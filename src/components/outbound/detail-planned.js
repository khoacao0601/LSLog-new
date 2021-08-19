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
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';
//import Typography from '@material-ui/core/Typography';
//import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import{ DataGrid } from '@material-ui/data-grid';
import Icon from '@material-ui/core/Icon';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const DetailPlannedWaves = () => {
    const classes = useStyles();

    const [allOrders, setAllorders] = useState([]);
    const [state, setState] = useState({
        age: '',
        name: 'hai',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
    };
    

    const history = useHistory();

    const onClickCreateOrder = () => {
        history.push('/Inbound/CreateOrder');
    }

    const paramURL = window.location.href;
    var urltest = new URL(paramURL);
    var paramOnly = urltest.searchParams.get("number");
   // console.log(`Order ID:`, orderId)
    const url = `http://3.142.47.66:8141/v1/receiving-orders/?orderId=${paramOnly}`

    //dialog functions
    const [open, setOpen] = useState(false);
    const [openAction, setOpenAction] = useState(false)


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenAction = () => {
        setOpenAction(true);
    };
    const handleCloseAction = () => {
        setOpenAction(false);
    }; 

    const [ status, setStatus] = useState(null);

    const handleClickStatus = () => {
        setStatus(null)
    };
    const handleCloseStatus = () => {
        setStatus(null)
    };
 
    //Radio
    const [stateRadio, setStateRadio] = useState({
        selectedValue: "A",
    });
    const handleRadio = event => {
        setStateRadio({ selectedValue: event.target.value });
    };

    //Checkboxes
    const [stateCheck1, setStateCheck1] = useState({
        dockLeveler: false,
    });
    const [stateCheck2, setStateCheck2] = useState({
        forkLift: false,
    });
    const [stateCheck3, setStateCheck3] = useState({
        reachTruck: false,
    });
    const [stateCheck4, setStateCheck4] = useState({
        palletJack: false,
    });
    const handleCheck1 = name => event => {
        setStateCheck1({ [name]: event.target.checked });
    };
    const handleCheck2 = name => event => {
        setStateCheck2({ [name]: event.target.checked });
    };
    const handleCheck3 = name => event => {
        setStateCheck3({ [name]: event.target.checked });
    };
    const handleCheck4 = name => event => {
        setStateCheck4({ [name]: event.target.checked });
    };

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
    const orderIdState = (e) => {
        //debugger;
        console.log(e.target.value);
    }

    //Breadcrumbs
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
            field: 'positions', 
            headerName: 'LINE', 
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
            field: 'item', 
            headerName: 'ITEM', 
            description: 'item description', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'qty', 
            headerName: 'QTY', 
            description: 'item quantity', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'uom', 
            headerName: 'UOM', 
            description: 'Unit of Measurement', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'totalEach', 
            headerName: 'Total EA', 
            description: 'Total Eaches', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'sku', 
            headerName: 'SKU', 
            description: 'SKU Number', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'lot', 
            headerName: 'LOT', 
            description: 'Lot Data', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'tag', 
            headerName: 'TAG', 
            description: 'Tag Information', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'flag', 
            headerName: 'FLAG', 
            description: 'Flag Information', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'location', 
            headerName: 'LOCATION', 
            description: 'Location Information', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'status', 
            headerName: 'STATUS', 
            description: 'status', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
    ];

    let rows = allOrders.map(object=> (
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

    //Details Table & Planniing
    function createData(created, expected, status, manufacturer, client, carrier, statusMessage) {
        return { created, expected, status, manufacturer, client, carrier, statusMessage };
    }

    const detailRows = [
        createData("01/01/21", "01/01/22", "UNPLANNED", "COMPANY", "COMPANY", "COMPANY", "This order has not been planned."),
    ];

    return(
        <main className={classes.content}>
            <Toolbar />
            <div className={classes.container}>
                <h1>Fulfillment / Orders / S0001</h1>

                <TableContainer component={Paper} className={classes.detailsTable}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead className={classes.detailsTableHead}>
                        <TableRow>
                            <TableCell colSpan={4}>DETAILS</TableCell>
                            <TableCell align="left">PLANNING</TableCell>
                        </TableRow>
                        </TableHead>
                        {detailRows.map((row2) => (
                        <TableBody key={row2.name}>
                            <TableRow>
                                <TableCell className={classes.detailsTableCell}>CREATED:</TableCell>
                                <TableCell width="220px">{row2.created}</TableCell>
                                <TableCell className={classes.detailsTableCell2}>MANUFACTURER:</TableCell>
                                <TableCell width="220px">{row2.manufacturer}</TableCell>
                                <TableCell>{row2.statusMessage}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.detailsTableCell}>EXPECTED:</TableCell>
                                <TableCell>{row2.expected}</TableCell>
                                <TableCell className={classes.detailsTableCell2}>CLIENT:</TableCell>
                                <TableCell>{row2.client}</TableCell>
                                <TableCell className={classes.detailsTableButtonCell}>
                                    <Button variant="outlined" className={classes.detailsTableButton} onClick={handleClickOpen}>PLAN ORDER</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.detailsTableCell}>STATUS:</TableCell>
                                <TableCell>{row2.status}</TableCell>
                                <TableCell className={classes.detailsTableCell2}>CARRIER:</TableCell>
                                <TableCell>{row2.carrier}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                        ))}
                    </Table>
                </TableContainer>
                
                
                <div className={classes.componentTop}>   
                    <div className="w3-dropdown-hover">
                    <Button variant="outlined" className={classes.button}>ACTIONS &darr;</Button>
                        <div className="w3-dropdown-content w3-bar-block w3-card-4">
                            <div href="#" className="w3-bar-item w3-button">Release</div>
                            <div href="#" className="w3-bar-item w3-button" onClick={handleClickOpenAction}>Edit</div>
                            <div href="#" className="w3-bar-item w3-button">Delete</div>
                        </div>          
                    </div>
                    <div className={classes.grow} />
                    <TextField 
                        className={classes.searchBar} 
                        id="globalSearchBar" 
                        label="Search S0001" 
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
                </div>
            </div>
            
            <div style={{ height: 700, width: 'auto', display:'flex', justifyContent:'center', }}>
                <DataGrid className={classes.root_two} align='center' rows={allOrders} columns={columns} pageSize={20} getRowId={(row) => row.pKey } checkboxSelection>
                    {rows}
                </DataGrid>
            </div>

            <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><h1>Create Wave</h1></DialogTitle>
                <DialogContent className={classes.dialogContainer}>
                    <form noValidate>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{width: "400px", verticalAlign: "top",}}>
                                        <DialogContentText className={classes.underline}>DATE & TIME:</DialogContentText>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormLabel className={classes.dialogLabel}>DATE:</FormLabel>
                                                <TextField
                                                    id="date"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    className={classes.dialogTextField}
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container justify="left" width={1}>
                                                <FormLabel className={classes.dialogLabel}>TIME:</FormLabel>
                                                <TextField
                                                    id="time"
                                                    type="time"
                                                    defaultValue="07:30"
                                                    className={classes.dialogTextField}
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps={{
                                                        step: 300, // 5 min
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <DialogContentText className={classes.dialogLabel}>ALLOCATION</DialogContentText>
                                            </Grid>
                                            <Grid>
                                                <FormLabel className={classes.dialogLabel}># OF BATCHES:</FormLabel>
                                            </Grid>
                                            <Grid>
                                                <FormLabel className={classes.dialogLabel}>BATCHES DEFINED BY:</FormLabel>
                                            </Grid>
                                        </Grid>

                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <DialogContentText className={classes.dialogLabel}>ASSIGNED TO:</DialogContentText>
                                            </Grid>
                                            <Grid container justify="left" width={1}>
                                                <FormControlLabel control={<Radio
                                                    className={classes.dialogCheckbox}
                                                    checked={stateRadio.selectedValue === 'b'}
                                                    onChange={handleRadio}
                                                    value="a"
                                                    name="radio-button-demo"
                                                    aria-label="A"
                                                    color="primary"
                                                />} label="ANY QUALIFIED EMPLOYEE"/>
                                            </Grid>
                                        </Grid>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormControlLabel control={<Radio
                                                    className={classes.dialogCheckbox}
                                                    checked={stateRadio.selectedValue === 'a'}
                                                    onChange={handleRadio}
                                                    value="a"
                                                    name="radio-button-demo"
                                                    aria-label="A"
                                                    color="primary"
                                                />} label="SPECIFIED EMPLOYEES:"/>
                                                <TextField
                                                    style={{width: "130px",margin: "0 5px",}}
                                                    id="time"
                                                    type="text"
                                                    defaultValue=""
                                                    className={classes.dialogTextField}
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>



                                        <DialogContentText style={{marginTop: "40px",}} className={classes.underline}>DROP OFF LOCATION:</DialogContentText>
                                        <Grid item >
                                            <FormControlLabel control={
                                                        <Checkbox
                                                            className={classes.dialogCheckbox}
                                                            checked={stateCheck1.dockLeveler}
                                                            onChange={handleCheck1('dockLeveler')}
                                                            value="multipleDropOffLocations"
                                                            color="primary"
                                                        />}
                                                    label="Multiple Drop Off Locations"/>
                                        </Grid>

                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="age-native-simple">Select Location</InputLabel>
                                            <Select
                                            native
                                            value={state.age}
                                            onChange={handleChange}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-native-simple',
                                            }}
                                            >
                                            <option aria-label="None" value="" />
                                            <option value={10}>10A-225-7</option>
                                            <option value={20}>134B-12-42</option>
                                            <option value={30}>749-220-4</option>
                                            </Select>
                                        </FormControl>

                                    </TableCell>
                                    <TableCell>
                                        <DialogContentText className={classes.underline}>FLAGS</DialogContentText>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormLabel>1. 2 lines in the wave are located in the DEA cage and require the appropriate authorization.</FormLabel>
                                                <DialogContentText>More Info</DialogContentText>
                                                
                                            </Grid>
                                        </Grid>


                                        <DialogContentText style={{marginTop: "40px",}} className={classes.underline}>DETAILS</DialogContentText>
                                        <Grid item>
                                                <DialogContentText>Lines:  1</DialogContentText>
                                                <DialogContentText>Areas:  2</DialogContentText>
                                                <DialogContentText>Orders: 1</DialogContentText>
                                                <DialogContentText>SKUs:   7</DialogContentText>
                                                <DialogContentText>Tags:   7</DialogContentText>
                                                <DialogContentText>Lots:   7</DialogContentText>
                                        </Grid>

                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} onClick={handleClose} variant="outlined">CANCEL</Button>
                    <Button className={classes.button} onClick={handleClose} variant="outlined">PLAN WAVE</Button>
                </DialogActions>
            </Dialog>


            {/* Action Button Modal */}
            <Dialog
                className={classes.dialog}
                open={openAction}
                onClose={handleCloseAction}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Edit Order Details"}</DialogTitle>
                <DialogContent className={classes.dialogContainer}>
                    <form className={classes.containerAction} noValidate>
                        <TextField
                            id="date"
                            label="EXPECTED DELIVERY DATE"
                            type="date"
                            defaultValue="2022-01-01"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <DialogContentText>STATUS</DialogContentText>
                        <Menu
                        id="simple-menu"
                        status={status}
                        keepMounted
                        open={Boolean(status)}
                        onClose={handleCloseStatus}
                        >
                            <MenuItem onClick={handleCloseStatus}>Profile</MenuItem>
                            <MenuItem onClick={handleCloseStatus}>My account</MenuItem>
                            <MenuItem onClick={handleCloseStatus}>Logout</MenuItem>
                        </Menu>
                        <DialogContentText className={classes.underline}>CUSTOMER</DialogContentText>
                        <TextField id="outlined-basic" label="CUSTOMER" variant='outlined' className={classes.textField}/>
                        <DialogContentText className={classes.underline}>CLIENT</DialogContentText>
                        <TextField id="outlined-basic" label="CLIENT" variant="outlined" className={classes.textField}/>
                        <DialogContentText className={classes.underline}>CARRIER</DialogContentText>
                        <TextField id="outlined-basic" label="CARRIER" variant="outlined" className={classes.textField}/>
                        <DialogContentText className={classes.underline}>CARRIER TYPE</DialogContentText>
                        <TextField id="outlined-basic" label="CARRIER TYPE" variant="outlined" className={classes.textField}/>
                    </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseAction} color="secondary" variant='contained'>
                    CANCEL
                </Button>
                <Button onClick={handleCloseAction} color="primary" variant='contained'>
                    SAVE
                </Button>
                </DialogActions>
            </Dialog>

        </main>
    )
}

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
        backgroundColor: "#E0E0E0",
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
    //Modal Style
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    //Dialog Styles
    dialog: {
        "& >div>div": {
            maxWidth: "1000px",
            display: 'flex',
            // flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
    },
    dialogContainer: {
        minWidth: "900px",
    },
    dialogLabel: {
        marginBottom: ".5rem",
        marginRight: "15px",
        alignSelf: "center",
    },
    dialogTextField: {
        marginBottom: ".5rem",
        "& >div>input": {
            padding: "5px 10px",
        }
    },
    dialogCheckbox: {
        padding: "0px 9px",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
    underline: {
        textDecorationLine: 'underline',
    },
    containerAction: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%'
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
    detailsTable: {
        backgroundColor:"#E0E0E0",
        marginTop: "20px",
    },
    detailsTableHead: {
        "& >tr>th": {
            fontSize: "18px",
            textDecoration: "underline",
        },
    },
    detailsTableButton:{
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(0),
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: "#C0C0C0",
    },
    detailsTableCell: {
        width: "85px",
        paddingRight: "0",
    },
    detailsTableCell2: {
        width: "130px",
        paddingRight: "0",
    },
    detailsTableButtonCell:{
        paddingTop: 0,
        paddingBottom: 0,
    },
}));


export default DetailPlannedWaves;