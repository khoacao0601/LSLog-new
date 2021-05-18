
import {configureStore} from '@reduxjs/toolkit';

import viewReducer from './reducer/viewsControlSlice';
import usersReducer from './reducer/usersControlSlice';

//Store
const store = configureStore({
    reducer: {
        viewReducer,
        usersReducer
    }
})

// Export 
export default store;
