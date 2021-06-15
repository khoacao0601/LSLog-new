import React from 'react';
import Radium from 'radium'; //CSS-in-JS library support :hover
import {useDispatch} from 'react-redux';
import {setViews} from '../store/reducer/topNavBarViewsControl';

const DashBoardTopNavBar = () => {

    const dispatch = useDispatch();

    const onClickInbound = () => {
        delete styles.inventory.backgroundColor;
        delete styles.outBound.backgroundColor;
        delete styles.notifications.backgroundColor;
        styles.inBound.backgroundColor = "white";
        dispatch(setViews('inbound'));
    } 

    const onClickInventory = () => {
        //debugger;
        delete styles.inBound.backgroundColor;
        delete styles.outBound.backgroundColor;
        delete styles.notifications.backgroundColor;
        styles.inventory.backgroundColor = "white";
        dispatch(setViews('inventory'));
    } 

    const onClickOutbound = () => {
        delete styles.inventory.backgroundColor;
        delete styles.inBound.backgroundColor;
        delete styles.notifications.backgroundColor;
        styles.outBound.backgroundColor = "white";
        dispatch(setViews('outbound'));
    } 

    const onClickNotification = () => {
        delete styles.inventory.backgroundColor;
        delete styles.outBound.backgroundColor;
        delete styles.inBound.backgroundColor;
        styles.notifications.backgroundColor = "white";
        dispatch(setViews('notification'));
    } 

    return (
        <div style={styles.container}>
            <div className="d-flex justify-content-between" style={styles.buttonDiv}>
                {/* key for using one style in multiple div*/}
                <div className="" style={styles.inBound} key="key1" onClick={onClickInbound}>INBOUND</div>
                <div className="" style={styles.inventory} key="key2" onClick={onClickInventory}>INVENTORY</div>
                <div className="" style={styles.outBound} key="key3" onClick={onClickOutbound}>OUTBOUND</div>
                <div className="" style={styles.divGlobalSearchBar}>
                    <input type="text" placeholder="GLOBAL SEARCH" style={styles.globalSearchBar} />
                </div>
                <div className="" style={styles.notifications} onClick={onClickNotification}>NOTIFICATIONS</div>
                <div className="w3-dropdown-hover" style={styles.settings}>
                    SETTINGS &darr;
                    <div className="w3-dropdown-content w3-bar-block w3-border">
                        <div className="w3-bar-item w3-button">Users Info</div>
                        <div className="w3-bar-item w3-button">DarkMode</div>
                        <div className="w3-bar-item w3-button">Logout</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


//CSS-in-JS style 
const styles = {
    container: {
        width: "100%",
        height: "11vh",
        backgroundColor: "lightgray",
        zIndex: -1
    },
    buttonDiv: {
        position: "absolute",
        top: "6vh",
        left: "20%",
        width: "75%"
    },
    inBound: {
        height: "6vh",
        width: "8vw",
        textAlign: "center",
        borderRadius: "20px 20px 0px 0px",
        lineHeight: "5vh",
        fontWeight: "bold",
        ":hover": {
            cursor: "pointer",
            backgroundColor: "white"
        }
    },
    inventory: {
        height: "6vh",
        width: "8vw",
        textAlign: "center",
        borderRadius: "20px 20px 0px 0px",
        lineHeight: "5vh",
        fontWeight: "bold",
        ":hover": {
            cursor: "pointer",
            backgroundColor: "white"
        }
    },
    outBound: {
        height: "6vh",
        width: "8vw",
        textAlign: "center",
        borderRadius: "20px 20px 0px 0px",
        lineHeight: "5vh",
        fontWeight: "bold",
        ":hover": {
            cursor: "pointer",
            backgroundColor: "white"
        }
    },
    globalSearchBar: {
        width: "20vw",
        marginTop: "1vh"
    },
    notifications: {
        height: "6vh",
        width: "8vw",
        textAlign: "center",
        borderRadius: "20px 20px 0px 0px",
        lineHeight: "5vh",
        fontWeight: "bold",
        ":hover": {
            cursor: "pointer",
            backgroundColor: "white",
        }
    },
    settings: {
        height: "6vh",
        width: "8vw",
        textAlign: "center",
        borderRadius: "20px 20px 0px 0px",
        lineHeight: "5vh",
        fontWeight: "bold",
    }
}


export default Radium(DashBoardTopNavBar);