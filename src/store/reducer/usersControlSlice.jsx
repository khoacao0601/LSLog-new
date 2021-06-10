import {createSlice} from '@reduxjs/toolkit';


const usersControlSlice = createSlice({
    name: 'users',//name must be unique
    initialState: {
        allUsers: [],
        onlyUserName: '',
        userInData: {}
    },

    reducers: {
        setUsers: (state, action) => {
            const users= action.payload;
            state.allUsers = users;
            //console.log(action);
            //console.log(state.allUsers);
        },
        setUserInData: (state, action) => {
            const userInData = action.payload;
            state.userInData = userInData;
            //console.log(state.userInData);
        }
    }
});

//Reducer
const usersReducer = usersControlSlice.reducer;

//Selector to take out data from state
export const usersSelector = state => state.usersReducer.allUsers;
export const userInfoDataSelector = state => state.usersReducer.userInData;

//Action Export
export const {setUsers, setUserInData} = usersControlSlice.actions;

//Export Reducer
export default usersReducer;


