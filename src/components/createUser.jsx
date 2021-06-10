import React, {useEffect, useState} from 'react';
import createUserPic from '../images/LSLCreateUser1.png';

//included CSS, Boostrap, and W3.CSS library

const CreateUser = () => {

    const [newUser, setNewUser] = useState({
        fullName: "",
        userName: "",
        email: "",
        password: "",
        phoneNumber: "",
        skype: "",
        office: "",
        dept: "",
        gender: ""
    })

    const [sendValue, setSendValue] = useState();

    //const [buttonStatus, setButtonStatus] = useState('');

    const updateField = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    //setup value for Post request
    useEffect(() => {
        console.log(newUser.fullName);
        setSendValue({
            username: newUser.userName,
            email: newUser.email
        })
    }, [newUser.email, newUser.fullName, newUser.userName])


    //do Post request
    const sendInfos = (e) => {
        console.log(JSON.stringify(sendValue));
        fetch('http://18.218.0.232:8110/uaa/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendValue)
          });
    }

    return(
        <form className="w3-container" style={styles.container}>
            <img src={createUserPic} alt='front' style={styles.pic} className="w3-margin-top"/>
            <h3 className="w3-margin">Rigistration Info </h3> 
            <label className="font-weight-bold w3-margin">Full Name: <i style={styles.iTag}>*</i></label> 
                <input type="text" className="w3-input" name="fullName" onChange={updateField} value={newUser.fullName}></input>
            <label className="font-weight-bold w3-margin">UserName: <i style={styles.iTag}>*</i></label>
                <input className="w3-input" type="text" name="userName" onChange={updateField} value={newUser.userName}></input>
            <label className="font-weight-bold w3-margin">Email: <i style={styles.iTag}>*</i></label> 
                <input type="text" className="w3-input" name="email" onChange={updateField} value={newUser.email}></input>
            <label className="font-weight-bold w3-margin">Password: <i style={styles.iTag}>*</i></label>
                <input type="password" className="w3-input" name="password" onChange={updateField} value={newUser.password}></input>
            <label className="font-weight-bold w3-margin">Phone Number: <i style={styles.iTag}>*</i></label>
                <input className="w3-input" type="number" name="phoneNumber" onChange={updateField} value={newUser.phoneNumber}></input>
            <label className="font-weight-bold w3-margin">SkypeID:</label>
                <input className="w3-input" type="text" name="skype" onChange={updateField} value={newUser.skype}></input>
            <label className="font-weight-bold w3-margin">Office:</label>
                <input className="w3-input" type="text" name="office" onChange={updateField} value={newUser.office}></input>
            <label className="font-weight-bold w3-margin">Department: </label>
                <select className="w3-select w3-border" name="dept" onChange={updateField} value={newUser.dept}>
                    <option value="" disabled defaultValue>Choose your option</option>
                    <option value="Dep. 1">Dep. 1</option>
                    <option value="Dep. 2">Dep. 2</option>
                    <option value="Dep. 3">Dep. 3</option>
                </select>
            <label className="font-weight-bold w3-margin">Gender:</label>
                <select className="w3-select w3-border" name="gender" onChange={updateField} value={newUser.gender}>
                    <option value="" disabled defaultValue>Choose your option</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            <p></p>
            <h5 style={styles.iTag}>* required </h5>
            <p><button className="w3-button w3-green w3-margin" onClick={sendInfos}>Submit</button></p>
        </form>
    )
}


//React in file CSS object
let styles = {
    container: {
        border: 1,
        width: '45%',
        left: '28%',
        position: 'absolute',
        top: '8%',
        boxShadow: '30px 22px 45px grey',
        borderRadius: '8px'
    },
    pic: {
        width: '100%',
        height: '15vh'
    },
    iTag: {
        color: "red"
    }
}

export default CreateUser;