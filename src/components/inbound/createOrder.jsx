import React from "react";

const CreateOrder = () => {
    return(
        <div style={styles.constainer}>
            <h1>Inbound / Create Order</h1>
            ITEM: <input type="text" placeholder="SEARCH BY SKU OR DESCRIPTION" style={styles.searchBar} /> <br/>
            <div style={{ marginTop: "3vh" }}>
                QUANTITY: <input type="text" style={styles.quantityBar} />
                UOM: <input type="text" style={styles.quantityBar} />
            </div>   
            DATE EXPECTED: <input type="date" style={styles.dateExpected} /> <br/>
            <button className="w3-button w3-light-grey" style={styles.addLine}>ADD LINE</button>  
            <hr/> 
            <h5>Lines in Order</h5> 
            <table className="w3-table w3-bordered">
            <tr className="d-flex justify-content-between" style={styles.table}>
                <th>LINES</th>
                <th>ITEM</th>
                <th>QTY</th>
                <th>UOM</th>
                <th>TOTAL EA</th>
                <th>SKU</th>
                <th>DATE EXPECTED</th>
            </tr>
            <tbody></tbody>
        </table>
        <button className="w3-button w3-light-grey" style={styles.cancelButton}>CANCEL</button>  
        <button className="w3-button w3-light-grey" style={styles.cancelButton}>SUBMIT</button>  
        </div>
    )
}

const styles = {
    constainer: {
        position: "relative",
        left: "39vh",
        top: "3vh"
    },
    searchBar: {
        width: "55vh",
        marginTop: "2vh"
    },
    quantityBar: {
        width: "29vh",
        marginRight: "3vh"
    },
    dateExpected: {
        width: "25vh",
        marginTop: "3vh"
    },
    addLine: {
        width: "15vh",
        marginTop: "4vh"
    },
    table:{
        width: "150vh",
        marginTop: "2vh"
    },
    cancelButton: {
        width: "15vh",
        marginRight: "4vh"
    }
}

export default CreateOrder;