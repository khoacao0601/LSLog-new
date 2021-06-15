import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setViews} from '../../store/reducer/topNavBarViewsControl';

const Orders = () => {

    const dispatch = useDispatch();

    const [allOrders, setAllorders] = useState();

    const onClickCreateOrder = () => {
        dispatch(setViews("createOrder"));
    }



    return(
    <div style={styles.constainer}>
        <h1>Inbound / Orders</h1>
        <div style={styles.buttonDiv}>
            <button className="w3-button w3-light-grey" style={styles.createOrder} onClick={onClickCreateOrder}>CREATE ORDER</button>
            <button className="w3-button w3-light-grey" style={styles.actions}>ACTIONS</button>
            <input type="text" placeholder="SEARCH INBOUND ORDERS" style={styles.searchBar} />
            <div className="w3-dropdown-hover" style={{ marginLeft: "4vh"}}>
                <button className="w3-button w3-light-grey" style={styles.filter}>FILTER &darr;</button>
                <div style={{ marginLeft: "4vh"}} className="w3-dropdown-content w3-bar-block w3-card-4">
                    <div href="#" className="w3-bar-item w3-button">Filter 1</div>
                    <div href="#" className="w3-bar-item w3-button">Filter 2</div>
                    <div href="#" className="w3-bar-item w3-button">Filter 3</div>
                </div>          
            </div>
            <div className="w3-dropdown-hover" style={{ marginLeft: "4vh"}}>
                <button className="w3-button w3-light-grey" style={styles.filter}>SORT &darr;</button>
                <div style={{ marginLeft: "4vh"}} className="w3-dropdown-content w3-bar-block w3-card-4">
                    <div href="#" className="w3-bar-item w3-button">Sort 1</div>
                    <div href="#" className="w3-bar-item w3-button">Sort 2</div>
                    <div href="#" className="w3-bar-item w3-button">Sort 3</div>
                </div>          
            </div>
        </div>
        <table className="w3-table w3-bordered">
        <tr className="d-flex justify-content-between" style={styles.table}>
                <th>PRTY</th>
                <th>ORDER ID</th>
                <th>LINES</th>
                <th>STATUS</th>
                <th>DATE CREATED</th>
                <th>DATE EXPECTED</th>
                <th>DATE COMPLETED</th>
            </tr>
            <tr className="d-flex justify-content-between" style={styles.table}>
                <td>HIGH</td>
                <td>R0005</td>
                <td>10</td>
                <td>STATUS</td>
                <td>06/15/2021</td>
                <td>06/25/2021</td>
                <td>n/a</td>
            </tr>
            <tbody ></tbody>
        </table>
    </div>
    )
}

const styles ={
    constainer: {
        position: "relative",
        left: "39vh",
        top: "3vh"
    },
    table:{
        width: "150vh",
        marginTop: "2vh"
    },
    buttonDiv:{
        marginTop: "2vh"
    },
    createOrder:{
        width: "19vh"
    },
    actions:{
        width: "15vh",
        marginLeft: "4vh"
    },
    searchBar:{
        marginLeft: "30vh",
        width: "39vh",
    },
    filter: {
        width: "11vh",
        marginLeft: "4vh"
    },
    sort: {
        width: "15vh",
        marginLeft: "4vh"
    }
}

export default Orders;