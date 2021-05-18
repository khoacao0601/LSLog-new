import {createSlice} from '@reduxjs/toolkit';

const usersControlSlice = createSlice({
    name: 'users',
    initialState: {
        allUsers: {}
    },

    reducers: {
        setUsers: (state, action) => {
            
            const users= action.payload;
            state.allViews = users;
        }
    }
});

//Reducer
const usersReducer = usersControlSlice.reducer;

//Selector to take out data from state
export const usersSelector = state => state.usersReducer.allUsers;

//Action Export
export const {setUsers} = usersControlSlice.actions;

//Export Reducer
export default usersReducer;


