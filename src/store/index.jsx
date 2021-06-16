
import {configureStore} from '@reduxjs/toolkit';

import viewReducer from './reducer/viewsControlSlice';
import usersReducer from './reducer/usersControlSlice';
import topNavViewReducer from './reducer/topNavBarViewsControl';
import orderIdReducer from './reducer/orderIDCslice';

//Store
const store = configureStore({
    reducer: {
        viewReducer,
        usersReducer,
        topNavViewReducer,
        orderIdReducer
    }
})

// Export 
export default store;
