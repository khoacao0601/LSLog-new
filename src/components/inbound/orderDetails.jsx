import React, { useEffect, useState } from 'react';
import { orderIdSelector } from '../../store/reducer/orderIDCslice';
import {useDispatch, useSelector} from 'react-redux';
import {setViews} from '../../store/reducer/topNavBarViewsControl';
import {useParams, useRouteMatch} from 'react-router-dom';
//import './../../styling/orderDetails.css';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
//import Breadcrumbs from '@material-ui/core/Breadcrumbs';
//import Link from '@material-ui/core/Link';
import{ DataGrid } from '@material-ui/data-grid';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
    underline: {
        textDecoration: "underline",
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
    // console.log(params.row)
    return params.row.quantityExpected.magnitude
}

const getQuantityReceived = params => {
    // console.log(params.row)
    return params.row.quantityReceived.magnitude
}

const getSKU = params => {
    return params.row.product.sku
}

const getUOM = params => {
    // console.log(params.row.quantityExpected.unitType)
    console.log(params.row.quantityReceived.unitType[1])
    return params.row.quantityReceived.unitType[1]
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
        type: 'string',
        valueFormatter: getUOM,
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
        hide: false,
        valueFormatter: getQuantityReceived,
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

//Details Table & Planniing
function createData(created, expected, status, manufacturer, client, carrier, statusMessage) {
    return { created, expected, status, manufacturer, client, carrier, statusMessage };
    }
const detailRows = [
    createData("01/01/21", "01/01/22", "PENDING", "COMPANY", "COMPANY", "COMPANY", "This order has not been planned."),
];
      
const OrderDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    //const params = useParams();

    //dialog functions
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };   

    
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
    // const url = process.env.REACT_APP_SPECIFIC_ORDER
    console.log('specific', window.$SPECIFIC_ORDER)

    const [orderDetail, setOrderDetail] = useState([])


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

    //Radio
    const [stateRadio, setStateRadio] = useState({
        selectedValue: "A",
    });
    const handleRadio = event => {
        setStateRadio({ selectedValue: event.target.value });
    };


    //Select
    const [state, setState] = useState({
        crossDock: "",
    });
    const handleChange = (event) => {
        setState({ [event.target.name]: event.target.checked });
    };

    //Select Dock
    const [dock, setDock] = useState('');
    const handleDock = (event) => {
      setDock(event.target.value);
    };    
    //Select CrossDock
    const [crossDock, setCrossDock] = useState('');
    const handleCrossDock = (event) => {
      setCrossDock(event.target.value);
    };    


    const [warning, setWarning] = useState("");
    
    const [eachLine, setEachLine] = useState({
        //dock: "",
    });
    //set value for Autocomplete Material Desisgn
    const getValueAutoComplete = (description, sku) => {
        setEachLine({
            ...eachLine,
            item: description,
            sku: sku
        })
        setWarning("");
    }
    const updateField = (e) => {
        setEachLine({
            ...eachLine,
            [e.target.name]: e.target.value
        });
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
                // console.log(resJSON.positions[0].quantityExpected.magnitude)
                // console.log(resJSON.positions[0].quantityReceived.unitType[1])
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
            <TableCell align="center">{order.quantityExpected.magnitude}</TableCell>
            <TableCell align="center">{order.quantityReceived.unitType[1]}</TableCell>
            <TableCell align="center">{order.state}</TableCell>
            <TableCell align="center">{order.quantityReceivedMagnitude}</TableCell>
            <TableCell align="center">{order.product.sku}</TableCell>
            <TableCell align="center">{order.transportUnitBK}</TableCell>
        </TableRow>
    )

    console.log('test', process.env)
    return (
        <main className={classes.content}>
            <Toolbar />
          
            <h1>Inbound/ Order #: {paramOnly}</h1>

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

            <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><h1>Plan Order {paramOnly}</h1></DialogTitle>
                <DialogContent className={classes.dialogContainer}>
                    <form noValidate>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{width: "400px", verticalAlign: "top",}}>
                                        <DialogContentText className={classes.underline}>DATE & TIME:</DialogContentText>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormLabel className={classes.dialogLabel}>EXPECTED DELIVERY DATE:</FormLabel>
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
                                        <DialogContentText style={{marginTop: "40px",}} className={classes.underline}>LOCATION:</DialogContentText>
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormLabel className={classes.dialogLabel}>DOCK:</FormLabel>
                                                <FormControl className={classes.formControl} size="small" variant="outlined" style={{width:"230px"}}>
                                                    <Select
                                                        value={dock}
                                                        onChange={handleDock}
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
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormLabel className={classes.dialogLabel}>CROSS DOCK:</FormLabel>
                                                <FormControl className={classes.formControl} size="small" variant="outlined" style={{width:"230px"}}>
                                                    <Select
                                                        value={crossDock}
                                                        onChange={handleCrossDock}
                                                        displayEmpty
                                                        className={classes.dialogTextField}
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                    >
                                                        <MenuItem value="" disabled>SELECT SHIPPING DOCK</MenuItem>
                                                        <MenuItem value={"crossDock1"}>Dock 1</MenuItem>
                                                        <MenuItem value={"crossDock2"}>Dock 2</MenuItem>
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
                                        <Grid item >
                                            <Grid container justify="left" width={1}>
                                                <FormControlLabel control={<Radio
                                                    className={classes.dialogCheckbox}
                                                    checked={stateRadio.selectedValue === 'b'}
                                                    onChange={handleRadio}
                                                    value="b"
                                                    name="radio-button-demo"
                                                    aria-label="B"
                                                    color="primary"
                                                />} label="SPECIFIED EMPLOYEES"/>
                                                <TextField
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

export default OrderDetails;
