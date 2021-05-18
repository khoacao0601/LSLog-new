import {createSlice} from '@reduxjs/toolkit';


const viewsControlSlice = createSlice({
    name: 'views',
    initialState: {
        allViews: 'home'
    },

    reducers: {
        setViews: (state, action) => {
            
            const view = action.payload;
            state.allViews = view;
        }
    }
})

// Reducer
const viewReducer = viewsControlSlice.reducer;

//Selector to take out data from state
export const viewsSelector = state => state.viewReducer.allViews;

//Action Export
export const {setViews} = viewsControlSlice.actions;

//Export Reducer
export default viewReducer;