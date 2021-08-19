import {createSlice} from '@reduxjs/toolkit';

const inventoryControlSlice = createSlice({
    name: 'inventory',//name must be unique
    initialState: {
        inventories: null
    },

    reducers: {
        setInventory: (state, action) => {
            const inventory = action.payload;
            state.inventories = inventory;
        }
    }
})

// Reducer
const inventoryReducer = inventoryControlSlice.reducer;

//Selector to take out data from state
export const inventorySelector = state => state.inventoryReducer.inventories;

//Action Export
export const {setInventory} = inventoryControlSlice.actions;

//Export Reducer
export default inventoryReducer;