import React from 'react';
import createUserPic from '../images/LSLCreateUser1.png';

//included CSS, Boostrap, and W3.CSS library

const CreateUser = () => {
    return(
        <form className="w3-container" style={styles.container}>
            <img src={createUserPic} alt='front' style={styles.pic} className="w3-margin-top"/>
            <h3 className="w3-margin">Rigistration Info</h3>
            <label className="font-weight-bold w3-margin">Full Name:</label>
                <input type="text" class="w3-input" ></input>
            <label className="font-weight-bold w3-margin">UserName:</label>
                <input class="w3-input" type="text"></input>
            <label className="font-weight-bold w3-margin">Password:</label>
                <input type="password" class="w3-input" ></input>
            <label className="font-weight-bold w3-margin">Phone Number:</label>
                <input class="w3-input" type="number"></input>
            <label className="font-weight-bold w3-margin">SkypeID:</label>
                <input class="w3-input" type="text"></input>
            <label className="font-weight-bold w3-margin">Office:</label>
                <input class="w3-input" type="text"></input>
            <label className="font-weight-bold w3-margin">Department: </label>
                <select class="w3-select w3-border" name="option">
                    <option value="" disabled selected>Choose your option</option>
                    <option value="1">Dep. 1</option>
                    <option value="2">Dep. 2</option>
                    <option value="3">Dep. 3</option>
                </select>
            <label className="font-weight-bold w3-margin">Gender:</label>
                <select class="w3-select w3-border" name="option">
                    <option value="" disabled selected>Choose your option</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </select>
            <p><button class="w3-button w3-green w3-margin">Submit</button></p>
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
    }
}

export default CreateUser;