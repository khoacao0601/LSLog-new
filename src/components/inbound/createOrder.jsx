import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setInventory, inventorySelector} from '../../store/reducer/inventorySlice';

import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
//import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
//import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
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

const CreateOrder = () => {
    const classes = useStyles();

    const allInventory = useSelector(inventorySelector);

    const orderData = [
        

    ];

    const [eachLine, setEachLines] = useState({
        item: '',
        quanity: '',
        uom: '',
        dateEx: ''
    });

    const [addToOrder, setAddToOrder] = useState();

    const api_url = `http://3.129.210.227:8140/v1/products`;

    const dispatch = useDispatch();

    useEffect(() => {

        async function fetchPostList(){
            try {
                const requestUrl = api_url;
                const response = await fetch(requestUrl);
                //console.log(response);
            
                const responseJSON = await response.json();
                
                //console.log(responseJSON);
                dispatch(setInventory(responseJSON));

            } catch (error) {
                console.log('Failed to Fetch', error);
            } 
        }
        fetchPostList();


        setAddToOrder({
            item: eachLine.item,
            quanity: eachLine.quanity,
            uom: eachLine.uom,
            dateEx: eachLine.dateEx
        })

    }, []);


    const getValue= (e) => {
        setEachLines({
            ...eachLine,
            [e.target.name]: e.target.value
        });
    }

    const table = orderData.map((object, indexArray) =>             
        <tr className="d-flex justify-content-between text-center" style={{ width: "75vh"}} key={object.line}>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.line}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.item}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.qty}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.uom}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.totalEach}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.sku}</td>
          <td className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2">{object.dateEx}</td>
        </tr>       
    );


    return(
        <main className={classes.content}>
            <Toolbar />
            <div style={styles.container}>
                <h1>Inbound / Create Order</h1>
                ITEM: 
                <Autocomplete
                    value={eachLine.item}
                    id="combo-box-demo"
                    options={allInventory}
                    getOptionLabel={(option) => option.description}
                    style={{ width: 300 }}
                    onChange={(event, value) => getValue(value.description)}
                    renderInput={(params) => 
                    <TextField {...params} 
                        abel="Combo box" 
                        variant="outlined" 
                        name="item"
                        value={eachLine.item}
                        onChange={getValue}
                        />}
                />
                 <br/>
                <div style={{ marginTop: "3vh" }}>
                    QUANTITY: <input type="text" style={styles.quantityBar} />
                    UOM: <select>
                            <option value="" disabled selected>Options</option>
                            <option value="PALLET">PALLET</option>
                            <option value="CASES">CASES</option>
                            <option value="KITS">KITS</option>
                            <option value="EACHES">EACHES</option>
                        </select>
                </div>   
                DATE EXPECTED: <input type="date" style={styles.dateExpected} /> <br/>
                <button className="w3-button w3-light-grey" style={styles.addLine}>ADD LINE</button>  
                <hr/> 
                <h5>Lines in Order</h5> 
                <table className="w3-table w3-bordered w3-hoverable w3-striped">
                    <tr className="d-flex justify-content-between" style={{ width: "75vh"}}>
                        <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">LINES</th>
                        <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">ITEM</th>
                        <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">QTY</th>
                        <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">UOM</th>
                        <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">TOTAL EA</th>
                        <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">SKU</th>
                        <th className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2">DATE EXPECTED</th>
                    </tr>
                    <tbody>{table}</tbody>
                </table>
                <button className="w3-button w3-light-grey" style={styles.cancelButton}>CANCEL</button>  
                <button className="w3-button w3-light-grey" style={styles.cancelButton}>SUBMIT</button>  
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