import React from 'react';
import {useSelector} from 'react-redux';
import {userInfoDataSelector} from '../store/reducer/usersControlSlice';

const Welcome = () => {

    const userInfo = useSelector(userInfoDataSelector);

    return (
        <div className="w-50 mx-auto">
            <h1>Welcome to LSL main page</h1>
            <h2>Hello {userInfo.fullname}</h2>
            <div className="card" style={{width:'18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">User Info Card</h5>
                    <p className="card-text"><b>pKey:</b> {userInfo.pKey}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Username: </b>{userInfo.username}</li>
                    <li className="list-group-item"><b>Full Name: </b>{userInfo.fullname}</li>
                    <li className="list-group-item"><b>Description: </b>{userInfo.details.description}</li>
                    <li className="list-group-item"><b>Comment: </b>{userInfo.details.comment}</li>
                    <li className="list-group-item"><b>Phone number: </b>{userInfo.details.phoneNo}</li>
                    <li className="list-group-item"><b>IM: </b>{userInfo.details.im}</li>
                    <li className="list-group-item"><b>Office: </b>{userInfo.details.office}</li>
                    <li className="list-group-item"><b>Department: </b>{userInfo.details.department}</li>
                    <li className="list-group-item"><b>Gender: </b>{userInfo.details.gender}</li>
                </ul>
            </div>

        </div>
    )
}

export default Welcome;