import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setViews} from '../../store/reducer/topNavBarViewsControl';
import { setOrderId } from '../../store/reducer/orderIDCslice';

const Orders = () => {

    const dispatch = useDispatch();

    const [allOrders, setAllorders] = useState([]);

    const onClickCreateOrder = () => {
        dispatch(setViews("createOrder"));
    }

    const api_url = `http://3.14.130.41:8141/v1/receiving-orders`;

    useEffect(() => {
        async function fetchPostList(){
            try {
                const requestUrl = api_url;
                const response = await fetch(requestUrl);
                //console.log(response);
            
                const responseJSON = await response.json();
                
                //console.log(responseJSON);
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
            const date = new Date(dateTime);
            if(date.getUTCHours() >= 12){
                hour = date.getUTCHours() - 12 + ":" + date.getUTCMinutes() + " AM";
            } else {
                hour = date.getUTCHours + ":" + date.getUTCMinutes() + " AM";
            }
            const datePrint = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + "  " + hour;
            return datePrint;
        } else {
            return "N/A"
        }
    }

    //store OrderID to Redux Store and Change View to Order Details
    const storeOrderId = (orderId) => {
        dispatch(setViews("orderDetails"));
        dispatch(setOrderId(orderId));
    }

    const table = allOrders.map((object) =>   
        <tr className="d-flex justify-content-between text-center" style={{ width: "150vh"}} key={object.orderId} onClick={() => {storeOrderId(object.orderId)}}>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1" >{object.priority}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1" >{object.orderId}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1" >{object.positions[0].positionId}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1" >{object.state}</td>
          <td className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2" >{convertDateTime(object.createdDate)}</td>
          <td className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2" >{convertDateTime(object.expectedDate)}</td>
          <td className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2" >{convertDateTime(object.completedDate)}</td>
        </tr>       
    );

    return(
    <div style={styles.container}>
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
                <div style={{marginLeft: "4vh"}} className="w3-dropdown-content w3-bar-block w3-card-4">
                    <div href="#" className="w3-bar-item w3-button">Sort 1</div>
                    <div href="#" className="w3-bar-item w3-button">Sort 2</div>
                    <div href="#" className="w3-bar-item w3-button">Sort 3</div>
                </div>          
            </div>
        </div>
        <table className="w3-table w3-bordered w3-hoverable w3-striped">
            <tr className="d-flex justify-content-between" style={styles.table}>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">PRTY</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">ORDER ID</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">LINES</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">STATUS</th>
                <th className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2">DATE CREATED</th>
                <th className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2">DATE EXPECTED</th>
                <th className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2">DATE COMPLETED</th>
            </tr>
            <tbody>{table}</tbody>
        </table>
    </div>
    )
}

const styles ={
    container: {
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