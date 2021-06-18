
import {configureStore} from '@reduxjs/toolkit';

import viewReducer from './reducer/viewsControlSlice';
import usersReducer from './reducer/usersControlSlice';
import topNavViewReducer from './reducer/topNavBarViewsControl';
import orderIdReducer from './reducer/orderIDCslice';
import inventoryReducer from './reducer/inventorySlice';

//Store
const store = configureStore({
    reducer: {
        viewReducer,
        usersReducer,
        topNavViewReducer,
        orderIdReducer,
        inventoryReducer
    }
})

// Export 
export default store;
