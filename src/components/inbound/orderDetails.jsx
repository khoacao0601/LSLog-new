import React from 'react';
import './../../styling/orderDetails.css';
import {useSelector} from 'react-redux';
import {orderIdSelector} from '../../store/reducer/orderIDCslice';

const OrderDetails = () => {

    const orderId = useSelector(orderIdSelector);

    console.log(orderId);

    return (
        <div className='container-order'>
            <h1>Inbound / Orders / R0005 </h1>
            <div className='component-top'>
                <button className='actions'>
                    ACTIONS &darr;
                </button>
                <input className='searchbar' type='text' placeholder='SEARCH ORDER R0005' />
                <button className='filter'>FILTER &darr;</button>
            </div>
        </div>
    )
}

export default OrderDetails;
