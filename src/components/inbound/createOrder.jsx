import React, {useEffect, useState} from 'react';
//import {useDispatch} from 'react-redux';
//import {setViews} from '../../store/reducer/topNavBarViewsControl';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
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
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    
    const [newUser, setNewUser] = useState({
        fullName: "",
        userName: "",
        email: "",
        password: "",
        phoneNumber: "",
        skype: "",
        office: "",
        dept: "",
        gender: ""
    });
    
    const [sendValue, setSendValue] = useState();

    const updateField = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    //setup value for Post request
    useEffect(() => {
        console.log(newUser.fullName);
        setSendValue({
            username: newUser.userName,
            email: newUser.email
        })
    }, [newUser.email, newUser.userName, newUser.fullName])
    
    const testData = [
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
        },

    ];

    const table = testData.map((object, indexArray) =>
        <TableRow key={object.line}  className={classes.row}>
            <TableCell component="th" scope="row">{object.line}</TableCell>
            <TableCell align="center">{object.item}</TableCell>
            <TableCell align="center">{object.qty}</TableCell>
            <TableCell align="center">{object.uom}</TableCell>
            <TableCell align="center">{object.totalEach}</TableCell>
            <TableCell align="center">{object.sku}</TableCell>
            <TableCell align="center">{object.dateEx}</TableCell>
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
                            <TextField id="dateExpected" label="ITEM" variant="outlined" fullWidth placeholder="SEARCH BY SKU OR DESCRIPTION" />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Grid container justify="left" width={1}>
                            <TextField fullWidth id="dateExpected" label="QUANTITY" variant="outlined" />
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
                                    name="dept"
                                    value={newUser.dept}
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
                            <TextField fullWidth id="dateExpected" label="DATE EXPECTED" variant="outlined"
        
        type="date"
        //placeholder="MM/DD/YYYY"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />                        </Grid>
                    </Grid>
                    <Grid item xs={8}></Grid>
                    <Grid item xs={2}>
                        <Grid container justify="left" width={1}>
                            <Button fullWidth variant="outlined" className={classes.button}>ADD LINE</Button>
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