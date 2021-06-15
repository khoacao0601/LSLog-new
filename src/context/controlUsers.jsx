import React, { createContext, useState } from 'react';


export const ControlUsersContext = createContext();

const ControlUsersContextProvider = ({ children }) => {

    const [users, setUsers] = useState({});
    const [userInfo, setUserInfo] = useState({});

    const getUsersValue = (value) => {
        console.log(value);
        setUsers(value);
    }

    const userFilter = (value) => {
        for(let i = 0; i < users.length; i++){
            if(users[i].username === value ){
                setUserInfo(users[i]);
            }
        }
    }

    const usersDataContext = {
        users,
        userInfo,
        getUsersValue,
        userFilter
    }

    //Return Provider
    return(
        <ControlUsersContext.Provider value={usersDataContext}>
            {children}
        </ControlUsersContext.Provider>
    )
}

export default ControlUsersContextProvider;

