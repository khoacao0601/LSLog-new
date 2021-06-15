import React from 'react'
import './../../styling/orderDetails.css'

const OrderDetails = () => {
    return (
        <div className='container-order'>
            <h1>Inbound / Orders / R0005 </h1>
            <div>
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
