import React from 'react'

const CreateOrder = () => {
    return (
        <div>
            <form className='form-container'>
                <h1>Inbound / Create Order</h1>
                <label>Item: </label>
                <input type='text' placeholder='Search by SKU or Description' />
            </form>
        </div>
    )
}

export default CreateOrder
