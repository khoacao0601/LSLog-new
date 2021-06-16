import React, { useEffect, useState } from 'react'
import './../../styling/orderDetails.css'

const OrderDetails = () => {
    const url = 'http://3.14.130.41:8141/v1/receiving-orders/?orderId=1025'

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        async function getOrderDetail() {
            try{
                const requestUrl = url

                const res = await fetch(requestUrl);
                console.log(`Response before JSON Conversion`, res);

                const resJSON = await res.json()
                console.log(`Response AFTER JSON Conversion`, resJSON)

                setOrderDetail(resJSON.positions)
            }
            catch(err) {
                console.log('Failed to Fetch the Data', err);
            }
        }
        getOrderDetail()

    }, []);

    let tableBody = orderDetail.map((order) => 
        <tr className='table-row'>
            <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">
                {order.positionId}
            </td>
            <td>
                {order.product.description}
            </td>
            <td>
                {order.quantityExpected}
            </td>
            <td>
                {order.product.baseUnitUOM}
            </td>
            <td>
                N / A
            </td>
            <td>
                {order.state}
            </td>
            <td>
                {order.quantityReceivedMagnitude}
            </td>
            <td>
                {order.product.sku}
            </td>
            <td>
                {order.transportUnitBK}
            </td>
        </tr>
    )

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
            <table className='table-container'>
            <tr className="table-row d-flex justify-content-between">
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">Line</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">Item</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">QTY</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">UOM</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">Total Ea</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">Status</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">Qty Rcvd</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">SKU</th>
            </tr>
            <tbody className='table-body'>
                { tableBody }
            </tbody>
            </table>
        </div>
    )
}

export default OrderDetails;
