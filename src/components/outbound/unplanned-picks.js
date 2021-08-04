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
        },
    },
    dialogContainer: {
        minWidth: "500px",
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
    }
}));


const UnplannedPicks = () => {
    const classes = useStyles();

    const [allOrders, setAllorders] = useState([]);

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
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
                    onClick={handleClickOpen}
                  >
                    PLAN
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
        { 
            field: 'flags', 
            headerName: 'FLAGS', 
            description: 'flags', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'client', 
            headerName: 'CLIENT', 
            description: 'client', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'customer', 
            headerName: 'CUSTOMER', 
            description: 'customer', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'carrier', 
            headerName: 'CARRIER', 
            description: 'carier', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'type', 
            headerName: 'TYPE', 
            description: 'type', 
            flex: 1,  
            headerAlign: 'center', 
            align: 'center',
            headerClassName: 'datagrid-header', 
            hide: false, 
        },
        { 
            field: 'createdDate', 
            headerName: 'ORDERED', 
            description: 'Date Client Ordered', 
            flex: 1,  
            align: 'center',
            headerAlign: 'center', 
            headerClassName: 'datagrid-header', 
            hide: false, 
            type: 'dateTime',
            valueFormatter: (params) =>{return convertDateTime(params.value)}
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

    return(
        <main className={classes.content}>
            <Toolbar />
            <div className={classes.container}>
                <h1>Fulfillment / Orders</h1>
                <div className={classes.componentTop}>   
                        <Button variant="outlined" className={classes.button} onClick={onClickCreateOrder}>PLAN WAVE</Button>              
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
                        label="Search Picks" 
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
                                                    checked={stateRadio.selectedValue === 'a'}
                                                    onChange={handleRadio}
                                                    value="a"
                                                    name="radio-button-demo"
                                                    aria-label="A"
                                                    color="primary"
                                                />} label="ANY QUALIFIED EMPLOYEE"/>
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
                                        <DialogContentText style={{marginTop: "40px",}} className={classes.underline}>LOCATION:</DialogContentText>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormLabel className={classes.dialogLabel}>DOCK:</FormLabel>
                                                <FormControl className={classes.formControl} size="small" variant="outlined" style={{width:"230px"}}>
                                                    <Select
                                                        displayEmpty
                                                        className={classes.dialogTextField}
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >
                                                        <MenuItem value="" disabled>SELECT RECEIVING DOCK</MenuItem>
                                                        <MenuItem value={"dock1"}>Dock 1</MenuItem>
                                                        <MenuItem value={"dock2"}>Dock 2</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                    </TableCell>
                                    <TableCell>
                                        <DialogContentText className={classes.underline}>LABOR:</DialogContentText>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormLabel className={classes.dialogLabel} style={{lineHeight: "28px",}}>ASSIGN
                                                <TextField
                                                    style={{width: "40px",margin: "0 5px",}}
                                                    id="time"
                                                    type="text"
                                                    defaultValue=""
                                                    className={classes.dialogTextField}
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />EMPLOYEES TO RECEIVE THIS ORDER EMPLOYEES</FormLabel>
                                                
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
                                                />} label="ANY QUALIFIED EMPLOYEE"/>
                                            </Grid>
                                        </Grid>


                                        <DialogContentText style={{marginTop: "40px",}} className={classes.underline}>EQUIPMENT:</DialogContentText>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        className={classes.dialogCheckbox}
                                                        checked={stateCheck1.dockLeveler}
                                                        onChange={handleCheck1('dockLeveler')}
                                                        value="dockLeveler"
                                                        color="primary"
                                                    />}
                                                label="DOCK LEVELER"/>
                                            </Grid>
                                        </Grid>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        className={classes.dialogCheckbox}
                                                        checked={stateCheck2.forkLift}
                                                        onChange={handleCheck2('forkLift')}
                                                        value="forkLift"
                                                        color="primary"
                                                    />}
                                                label="FORKLIFT"/>
                                            </Grid>
                                        </Grid>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        className={classes.dialogCheckbox}
                                                        checked={stateCheck3.reachTruck}
                                                        onChange={handleCheck3('reachTruck')}
                                                        value="reachTruck"
                                                        color="primary"
                                                    />}
                                                label="REACH TRUCK"/>
                                            </Grid>
                                        </Grid>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        className={classes.dialogCheckbox}
                                                        checked={stateCheck4.palletJack}
                                                        onChange={handleCheck4('palletJack')}
                                                        value="palletJack"
                                                        color="primary"
                                                    />}
                                                label="PALLET JACK"/>
                                            </Grid>
                                        </Grid>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <Button className={classes.button} variant="outlined">+ ADD OTHER EQUIPMENT</Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} onClick={handleClose} variant="outlined">CANCEL</Button>
                    <Button className={classes.button} onClick={handleClose} variant="outlined">PLAN ORDER</Button>
                </DialogActions>
            </Dialog>

        </main>
    )
}


export default UnplannedPicks;