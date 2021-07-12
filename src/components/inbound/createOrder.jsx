import React, {useEffect, useState} from 'react';
//import {useDispatch} from 'react-redux';
//import {setViews} from '../../store/reducer/topNavBarViewsControl';
//import {useDispatch, useSelector} from 'react-redux';
//import {setInventory, inventorySelector} from '../../store/reducer/inventorySlice';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';
import{ DataGrid } from '@material-ui/data-grid';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {useDispatch, useSelector} from 'react-redux';
import {setViews} from '../../store/reducer/topNavBarViewsControl';
import {userInfoDataSelector} from '../../store/reducer/usersControlSlice';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {margin: theme.spacing(1),margincenter: theme.spacing(2),},flexGrow: 1,

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
        
    paper: {height: 40,width: 100,},
    page: {marginTop: 20,},
    control: {padding: theme.spacing(2),},

    componentTop: {
        display: "flex",
        marginTop: "3vh",
    },
    grow: {
        flexGrow: 1,
    },
    table: {
        minWidth: 700,
        //marginTop: "2vh",
    },
    tableHead: {
        backgroundColor: "#eee",
    },
    row: { align: 'center',
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
        margincenter: "4vh"
    },
    sort: {
        width: "15vh",
        margincenter: "4vh"
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
    backDrop: {
        backdropFilter: "blur(8px)",
        backgroundColor:'rgba(0,0,30,0.4)'
      },
}));

const CreateOrder = () => {

    const dispatch = useDispatch();

    const history = useHistory();

    const whoIn = useSelector(userInfoDataSelector);

    console.log(whoIn);

    const [testData, setTestData] = useState([]);
   
    const classes = useStyles();

    const api_url = `http://18.223.210.207:8140/v1/products`;

    const [inventory, setInventory] = useState();

    const [orders, setOrders] = useState([]);

    //orderiId,for now, will be removed when back end is ready
    const [fakeOrderId, setFakeOrderId] = useState();

    //current Date and Time
    const [currentDandT, setCurrentDandT] = useState();

    //control the warning of empty order
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackBar(false);
      };

    //control modal Dialog
    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
      };
      const handleClickOpenDialog = () => {
        setOpenDialog(true);
      };
    
    

    //Done button to redirect back to list all orders
    const goBackAllOrders = () => {
        history.push("/Inbound/Orders");
        handleCloseDialog();
    }
    //warning Empty input user
    const [warning, setWarning] = useState("");

    //const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    /*const handleDateChange = (date) => {

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };*/
    
    const [eachLine, setEachLine] = useState({
        item: "",
        quantity: "",
        UOM: "",
        dateAndTime: "",
        sku:" "

    });
    
    const [sendValue, setSendValue] = useState();
    

    //set value for Autocomplete Marterial Desisgn
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

        /*--Get name of invetory for autoComplete--*/
        async function fetchInventoryList(){
            try {
                const requestUrl = api_url;
                const response = await fetch(requestUrl);   
                const responseJSON = await response.json();
                //store Inventory info to state
                setInventory(responseJSON);
                //console.log(responseJSON);
            } catch (error) {
                console.log('Failed to Fetch', error);
            } 
        }
        fetchInventoryList();

        /*--get all info fro orders list to get the biggest order id, so we can generate order id from front-end, 
            will be removed later--*/
        async function fetchOrdersList(){
            try {
                const requestUrl = (`http://3.141.28.243:8141/v1/receiving-orders`);
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                setOrders(responseJSON);
            } catch (error) {
                console.log('Failed to Fetch', error);
            } 
        }
        fetchOrdersList();

        /*--set each line value for order--*/
        
        setSendValue({
            name: eachLine.item,
            positionId: (testData.length+1).toString(),
            state: "PROSESSING",
            quantityExpectedUOM: eachLine.UOM,
            quantityExpectedMagnitude: eachLine.quantity,
            quantityReceivedUOM: eachLine.UOM,
            quantityReceivedMagnitude: 0,
            product: {
                sku: eachLine.sku               
            },
            transportUnitBK: "10001001",
            details:{
                transportUnitTypeName: "CASES"
            },
            dateEx: eachLine.dateAndTime,
            sku: eachLine.sku
        })
    }, [api_url, eachLine.UOM, eachLine.dateAndTime, eachLine.item, eachLine.quantity, eachLine.sku, testData, testData.length])
    
    
    const pushToTestData = () => {
        //debugger;

        if(eachLine.item && eachLine.quantity && eachLine.UOM && eachLine.dateAndTime && eachLine.sku){
            setTestData([...testData, sendValue]);
            console.log(testData);
            setEachLine({
                item: "",
                quantity: "",
                UOM: "",
                dateAndTime: "",
                sku:" "
            });
            
            setWarning(" ");
        } else {
            setWarning(<Alert severity="error">Please Fill all Empty Fields!</Alert>)
        }
    }



    /*--remove Item from order--*/
    const removeItem = (value) =>{
        //debugger;
        console.log(value);
        //take index value of yor line
        let index = testData.findIndex((object) => {
            console.log(object)
            return object.positionId === value;
        });
        //you can't remove lne from real array, so I make a shallow array from testData to work on
        const removeArray = [...testData];
        removeArray.splice(index,1);
        //reindex array after remove one lement from i
        for(let i = 0; i < removeArray.length; i++){
            removeArray[i].positionId = i+1;
        }
        //set new vlaue for testData
        setTestData(removeArray);

        //setTestData(testData.filter(item => item.id !== value ));
    }

    console.log(testData);

    const convertDateTime = (dateTime) => {

        console.log(dateTime);
        if(dateTime) {
            let hour = null;
            let minutes = null;
            const date = new Date(dateTime+":00Z");
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
            const datePrint = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + hour;
            return datePrint;
        } else {
            return "N/A";
        }
    }
   

    //send data to backEnd
    const submitData = () => {

        if(testData.length !== 0) {
            //generate orderId, just for now, will be removed later
            const biggestOrderId = Math.max.apply(Math, orders.map(function(array) { return parseInt(array.orderId)}));
            setFakeOrderId(biggestOrderId+5);
            //generate priority number, will be removed later
            const priorityNum = Math.floor(Math.random() * 3) + 1;
            //generate random vendor, will be removed later
            const vendors = ["USPS", "UPS", "FedEx", "DHL", "Truck"];
            const random = Math.floor(Math.random() * vendors.length);
            const vendorRandom = vendors[random];
            //get current date and time, convert to ISOtime format
            var currentdate = new Date(); 
            var datetime =(currentdate.getMonth()+1)  + " " + currentdate.getDate() +  " "   + currentdate.getFullYear() + " "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + " UTC";  
            const newdate = new Date(datetime);
            setCurrentDandT(newdate.toString());
            //Date Expected for now
            let dateEx = null;
            if(testData.length !== 0) {
                dateEx = testData[0].dateEx+":00.000Z";
            }
            //reformat data before send
            for(let x = 0; x < testData.length; x++){
                delete testData[x].name;
                delete testData[x].sku;
                delete testData[x].dateEx;
            }
            //console.log(testData[0].dateEx);
            //object of Data to send
            const valueToSend = {
                state: "CREATED",
                orderId: (biggestOrderId+5).toString(),
                priority: priorityNum,
                positions: testData,
                details:{
                    vendor: vendorRandom
                },
                createdDate: newdate.toISOString(),
                expectedDate: dateEx
            }

             //do the POST request
             fetch('http://3.141.28.243:8141/v1/receiving-orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(valueToSend)
              });
              
              handleClickOpenDialog();
        }  else {
            setOpenSnackBar(true);
        } 
    }
   
    // Mapping over the testdata array to create a new row for each element in t
    const rows = testData.map((object) =>
        <TableRow key={object.positionId}  className={classes.row} >
            <TableCell component="th" scope="row">{object.positionId}</TableCell>
            <TableCell align="center">{object.name}</TableCell>
            <TableCell align="center">{object.quantityExpectedMagnitude} </TableCell>
            <TableCell align="center">{object.quantityExpectedUOM}</TableCell>
            <TableCell align="center">{object.quantityReceivedMagnitude}</TableCell>
            <TableCell align="center">{object.product.sku}</TableCell>
            <TableCell align="center">{object.dateEx}</TableCell>
            <TableCell><Icon>delete</Icon></TableCell>
        </TableRow>
    );

    // Converted the column headers into an array of objs and passing in to the DataGrid tag to display
    // Note: Flex overrides width, so the width property isn't actually doing anything currently
    // align key aligns the cells l/r/c
    const columns = [
        { field: 'positionId', headerName: 'LINES', description: '# of Lines', width: 190, headerAlign: 'center', headerClassName: 'datagrid-header', hide: false, flex: 1, type:'number', align: 'right', },
        { field: 'name', headerName: 'ITEM', description: 'Item Name', width: 130, headerAlign: 'center', headerClassName: 'datagrid-header', hide: false, flex: 1, align: 'center',},
        { field: 'quantityExpectedMagnitude', headerName: 'QTY', description: 'Quantity', width: 130, headerAlign: 'center', headerClassName: 'datagrid-header', hide: false, flex: 1, type: 'number', align: 'center',},
        { field: 'quantityExpectedUOM', headerName: 'UOM', width: 190, description: 'Unit of Measurement', headerAlign: 'center', headerClassName: 'datagrid-header', hide: false, flex: 1, align: 'center',},
        {
            field: 'quantityReceivedMagnitude',
            headerName: 'TOTAL EA',
            description: 'Total Eaches',
            width: 150,
            headerAlign: 'center',
            headerClassName: 'datagrid-header',
            flex: 1,
            align: 'center',
        },
        { field: 'sku', headerName: 'SKU', description: 'SKU Number', width: 190, headerAlign: 'center', headerClassName: 'datagrid-header', flex: 1, type: 'number', align: 'center',},
        { 
            field: 'dateEx', 
            headerName: 'DATE EXPECTED', 
            description: 'Date Expected', 
            width: 180, headerAlign: 'center', 
            headerClassName: 'datagrid-header', 
            flex: 1, 
            type: 'dateTime', 
            align: 'right',
            valueFormatter: (params) =>{return convertDateTime(params.value)}
        },
        { 
            field: '', 
            headerName: 'DELETE', 
            sortable: false, 
            width: 100, 
            description: 'Delete Line', 
            headerAlign: 'center', 
            headerClassName: 'datagrid-header', 
            flex: 1, 
            align: 'center', 
            renderCell: (params) => { 
                return <IconButton aria-label="delete" onClick={() => removeItem(params.id)}>
                            <DeleteIcon />
                        </IconButton>
            } 
        }   
    ];

    return(
       
        <main className={classes.content}>
            <Toolbar />
            <div style={styles.container}>
            
            <h1>Inbound / Create Order</h1>
               
                <Grid container spacing={3} className={classes.page}>
                    <Grid item xs={8}>
                        <Grid container justify="left" width={1}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={inventory}
                                getOptionLabel={(option) => option.description}
                                style={{ width: 300 }}
                                onChange={(event, value) => value ? getValueAutoComplete(value.description, value.sku) : setWarning("")}
                                renderInput={(params) => 
                                    <TextField {...params} 
                                    id="dateExpected" 
                                    label="ITEM" 
                                    variant="outlined" 
                                    fullWidth placeholder="SEARCH BY DESCRIPTION" 
                                    />}
                                />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Grid container justify="left" width={1}>
                            <TextField fullWidth 
                            id="dateExpected" 
                            label="QUANTITY" 
                            variant="outlined" 
                            name="quantity"
                            value={eachLine.quantity}
                            onChange={updateField}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                            <Grid container justify="center" width={1}>
                            <FormControl fullWidth width={300} variant="outlined" className={classes.formControl}>
                                <InputLabel id="dept-select-outlined-label">UOM</InputLabel>
                                <Select
                                    labelId="dept-select-outlined-label"
                                    label="Department"
                                    id="dept-select-outlined"
                                    name="UOM"
                                    value={eachLine.UOM}
                                    onChange={updateField}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"PALLETS"}>PALLETS</MenuItem>
                                    <MenuItem value={"CASES"}>CASES</MenuItem>
                                    <MenuItem value={"KITS"}>KITS</MenuItem>
                                    <MenuItem value={"EACHES"}>EACHES</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Grid container justify="left" width={1}>
                        <TextField
                                name="dateAndTime"
                                value={eachLine.dateAndTime}
                                onChange={updateField}
                                id="datetime-local"
                                label="Date - Time Expected"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />                     
                        </Grid>
                    </Grid>
                    <Grid item xs={8}></Grid>
                    <Grid item xs={2}>
                        <Grid container justify="left" width={1}>
                            <Button fullWidth 
                                    variant="outlined" 
                                    className={classes.button} 
                                    onClick={pushToTestData}>ADD LINE</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={10}></Grid>
                </Grid>
                {warning}
                <hr/> 
                <h5>Lines in Order</h5>
                <div style={{ height: 500, width: 'auto', display:'flex', justifyContent:'center', }}>
                    <DataGrid 
                        className={classes.root_two} 
                        align='center' 
                        rows={testData} 
                        columns={columns} 
                        pageSize={5} 
                        getRowId={(row) => row.positionId}
                    >
                        {rows}
                    </DataGrid>
                </div>
                <Grid container spacing={3} className={classes.page}>
                    <Grid item xs={2}>
                        <Grid container justify="center" width={1}>
                            <Button fullWidth variant="outlined" className={classes.button} onClick={goBackAllOrders}>CANCEL</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justify="center" width={1}>
                            <Button 
                                fullWidth variant="outlined" 
                                className={classes.button}
                                onClick={submitData}
                            >
                                SUBMIT
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}></Grid>
                </Grid>
                {currentDandT}
                {fakeOrderId} 
                   {/* --- Modal Snack Bar --- */}             
                <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                    <Alert onClose={handleCloseSnackBar} severity="error">
                        Empty order list! Can not submit!
                    </Alert>
                </Snackbar>
                    {/* --- Modal Dialog --- */} 
                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        BackdropProps={{
                            classes: {
                              root: classes.backDrop,
                            },
                          }}
                    >
        <DialogTitle id="alert-dialog-title">{"Successfully Create An Order"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            OrderId #: <Box fontWeight="fontWeightBold">{fakeOrderId}</Box>
            <br/>
            Order Items: <Box fontWeight="fontWeightBold">{testData.length}</Box>
            <br/>
            Created by Username: <Box fontWeight="fontWeightBold">{whoIn.username}</Box>
            <br/>
            Time: <Box fontWeight="fontWeightBold">{convertDateTime(currentDandT)}</Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={goBackAllOrders} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog> 
            </div>    
        </main>
    )
}

const styles = {
    searchBar: {
        width: "55vh",
        marginTop: "2vh"
    },
    quantityBar: {
        width: "29vh",
        marginRight: "3vh"
    },
    dateExpected: {
        width: "25vh",
        marginTop: "3vh"
    },
    addLine: {
        width: "15vh",
        marginTop: "4vh"
    },
    table:{
        width: "150vh",
        marginTop: "1vh"
    },
    cancelButton: {
        width: "15vh",
        marginRight: "4vh",
        marginTop: "4vh"
    }
}

export default CreateOrder;