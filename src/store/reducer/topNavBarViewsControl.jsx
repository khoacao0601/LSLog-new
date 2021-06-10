import {createSlice} from '@reduxjs/toolkit';


const topNavBarViewsControlSlice = createSlice({
    name: 'topNavBarviews',//name must be unique
    initialState: {
        allViews: ''
    },

    reducers: {
        setViews: (state, action) => {
            const view = action.payload;
            state.allViews = view;
        }
    }
})

// Reducer
const topNavViewReducer = topNavBarViewsControlSlice.reducer;

//Selector to take out data from state
export const topNavBarViewsSelector = state => state.topNavViewReducer.allViews;

//Action Export
export const {setViews} = topNavBarViewsControlSlice.actions;

//Export Reducer
export default topNavViewReducer;