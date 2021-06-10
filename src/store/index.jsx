
import {configureStore} from '@reduxjs/toolkit';

import viewReducer from './reducer/viewsControlSlice';
import usersReducer from './reducer/usersControlSlice';
import topNavViewReducer from './reducer/topNavBarViewsControl';

//Store
const store = configureStore({
    reducer: {
        viewReducer,
        usersReducer,
        topNavViewReducer
    }
})

// Export 
export default store;
