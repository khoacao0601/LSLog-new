import React, { createContext, useState } from 'react';

export const ControlViewsContext = createContext();

const ControlViewsContextProvider = ({ children }) => {
    //State
    const [views, setViews] = useState({
        view: "home"
    });

    //Function onClick for Nav Bar
    const viewsValueSet= (event, valueView) => {
        event.preventDefault();
        setViews({
            ...views,
            view: valueView
        })
    }

    const viewValueWelcome = (valueView) => {
        setViews({
            ...views,
            view: valueView
        })
    }


    //ContextData
    const viewsDataContext = {
        views,
        viewsValueSet,
        viewValueWelcome
    };

    //Return Provider
    return(
        <ControlViewsContext.Provider value={viewsDataContext}>
            {children}
        </ControlViewsContext.Provider>
    )
}

export default ControlViewsContextProvider;