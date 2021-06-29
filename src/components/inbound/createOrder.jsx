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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {margin: theme.spacing(1),marginLeft: theme.spacing(2),},flexGrow: 1,

        width: '100%',
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

const CreateOrder = () => {

    const [testData, setTestData] = useState(
        [
            {
                line: "1",
                item: "Hydrocodone",
                qty: "1",
                uom: "PALLET",
                totalEach: 1,
                sku: "A1B1C1",
                dateEx: "05/10/21 12:01 AM"
            },
            {
                line: "2",
                item: "Simvastatin",
                qty: "30",
                uom: "CASES",
                totalEach: 30,
                sku: "D4E5A1",
                dateEx: "05/11/21 12:10 AM"
            },
            {
                line: "3",
                item: "Metformin",
                qty: "64",
                uom: "KITS",
                totalEach: 64,
                sku: "B2F6G7",
                dateEx: "05/11/21 12:21 AM"
            },
            {
                line: "4",
                item: "Amlodipine",
                qty: "1000",
                uom: "EACHES",
                totalEach: 1000,
                sku: "J9H8G7",
                dateEx: "05/11/21 12:22 AM"
            }
    ]);
   


    const classes = useStyles();

    const api_url = `http://18.223.210.207:8140/v1/products`;

    const [inventory, setInventory] = useState();
    
    //warning Empty input user
    const [warning, setWarning] = useState("");

    //const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    /*const handleDateChange = (date) => {
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

    const setItemOnly = (value) => {
        setEachLine({
            ...eachLine,
            item: value
        })
    }
    //setup value for Post request
    useEffect(() => {
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

        //console.log();
        setSendValue({
            line: (testData.length+1).toString(),
            item: eachLine.item,
            qty: eachLine.quantity,
            uom: eachLine.UOM,
            totalEach: eachLine.quantity,
            sku: eachLine.sku,
            dateEx: eachLine.dateAndTime
        })
    }, [api_url, eachLine.UOM, eachLine.dateAndTime, eachLine.item, eachLine.quantity, eachLine.sku, testData, testData.length])
    
    
    const pushToTestData = () => {
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
        } else {
            setWarning("Can not be Empty")
        }
    }

  
    //take value from Property for order number
    const takeLineNum = (value) => {
        return testData.findIndex((object) => {
            return object.item === value;
        });
    }

    //remove Item from order
    const removeItem = (value) =>{
        const index = testData.findIndex((object) => {
            return object.item === value;
        });
        testData.splice(index,1);
        //console.log(testData);
        setTestData(testData.filter(item => item.line !== index));
    }

    console.log(testData);
    const table = testData.map((object) =>
        <TableRow key={object.sku}  className={classes.row}>
            <TableCell align="center">{object.line}</TableCell>
            <TableCell align="center">{object.item}</TableCell>
            <TableCell align="center">{object.qty}</TableCell>
            <TableCell align="center">{object.uom}</TableCell>
            <TableCell align="center">{object.totalEach}</TableCell>
            <TableCell align="center">{object.sku}</TableCell>
            <TableCell align="center">{object.dateEx}</TableCell>
            <TableCell align="center"><IconButton aria-label="delete" onClick={removeItem}><DeleteIcon /></IconButton>
            </TableCell>
        </TableRow>
    );
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
                                onChange={(event, value) => value ? getValueAutoComplete(value.description, value.sku) : setWarning("Can not be Empty")}
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
                                    <MenuItem value={"PALLET"}>PALLET</MenuItem>
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
                <hr/> 
                <h5>Lines in Order</h5>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell align="center">LINES</TableCell>
                                <TableCell align="center">ITEM</TableCell>
                                <TableCell align="center">QTY</TableCell>
                                <TableCell align="center">UOM</TableCell>
                                <TableCell align="center">TOTAL EA</TableCell>
                                <TableCell align="center">SKU</TableCell>
                                <TableCell align="center">DATE EXPECTED</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {table}
                        </TableBody>
                    </Table>
                </Paper>
                <Grid container spacing={3} className={classes.page}>
                    <Grid item xs={2}>
                        <Grid container justify="left" width={1}>
                            <Button fullWidth variant="outlined" className={classes.button}>CANCEL</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justify="left" width={1}>
                            <Button fullWidth variant="outlined" className={classes.button}>SUBMIT</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}></Grid>
                </Grid>
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