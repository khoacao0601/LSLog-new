import {createSlice} from '@reduxjs/toolkit';


const orderIDControlSlice = createSlice({
    name: 'orderID',//name must be unique
    initialState: {
        orderId: null
    },

    reducers: {
        setOrderId: (state, action) => {
            const id = action.payload;
            state.orderId = id;
        }
    }
})

// Reducer
const orderIdReducer = orderIDControlSlice.reducer;

//Selector to take out data from state
export const orderIdSelector = state => state.orderIdReducer.orderId;

//Action Export
export const {setOrderId} = orderIDControlSlice.actions;

//Export Reducer
export default orderIdReducer;