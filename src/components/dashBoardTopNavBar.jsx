import React from 'react';
import Radium from 'radium'; //CSS-in-JS library support :hover

const DashBoardTopNavBar = () => {
    return (
        <div style={styles.container}>
            <div style={styles.buttonDiv}>
                {/* key for using one style in multiple div*/}
                <div className="w3-container w3-cell" style={styles.buttonHover} key="key1">INBOUND</div>
                <div className="w3-container w3-cell" style={styles.buttonHover} key="key2">INVENTORY</div>
                <div className="w3-container w3-cell" style={styles.buttonHover} key="key3">OUTBOUND</div>
                <div className="w3-container w3-cell" style={styles.divGlobalSearchBar}>
                    <input type="text" placeholder="GLOBAL SEARCH" style={styles.globalSearchBar} />
                </div>
                <div className="w3-container w3-cell" style={styles.notifications}>NOTIFICATIONS</div>
                <div className="w3-container w3-cell" style={styles.settings}>SETTINGS</div>
            </div>
        </div>
    )
}



const styles = {
    container: {
        width: "100%",
        height: "18vh",
        backgroundColor: "lightgray",
        zIndex: -1
    },
    buttonDiv: {
        position: "absolute",
        top: "12%",
        left: "19%",
        width: "100%"
    },
    buttonHover: {
        height: "6vh",
        ":hover": {
            cursor: "pointer",
            backgroundColor: "white"
        }
    },
    divGlobalSearchBar: {
        
    },
    globalSearchBar: {
        width: "20vw"
    },
    notifications: {
       
        ":hover": {
            cursor: "pointer",
            backgroundColor: "white"
        }
    },
    settings: {
        
    }
}


export default Radium(DashBoardTopNavBar);