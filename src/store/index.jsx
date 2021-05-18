
import {configureStore} from '@reduxjs/toolkit';

import viewReducer from './reducer/viewsControlSlice';

//Store
const store = configureStore({
    reducer: {
        viewReducer 
    }
})

// Export 
export default store;
