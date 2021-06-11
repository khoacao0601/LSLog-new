import React from "react";

const CreateOrder = () => {

    const testData = [
        {
            line: "1",
            item: "hydrocodone",
            qty: "1",
            uom: "pallet",
            totalEach: 1,
            sku: "A1B1C1",
            dateEx: "05/10/21 12:01 AM"
        },
        {
            line: "2",
            item: "Simvastatin",
            qty: "30",
            uom: "CASES",
            totalEach: 30,
            sku: "D4E5A1",
            dateEx: "05/11/21 12:10 AM"
        },
        {
            line: "3",
            item: "Metformin",
            qty: "64",
            uom: "KITS",
            totalEach: 64,
            sku: "B2F6G7",
            dateEx: "05/11/21 12:21 AM"
        },
        {
            line: "4",
            item: "Amlodipine",
            qty: "1000",
            uom: "EACHES",
            totalEach: 1000,
            sku: "J9H8G7",
            dateEx: "05/11/21 12:22 AM"
        },

    ];

    const table = testData.map((object, indexArray) =>             
        <tr className="d-flex justify-content-between" style={styles.table}>
          <td className="text-center">{object.line}</td>
          <td className="">{object.item}</td>
          <td className="">{object.qty}</td>
          <td className="">{object.uom}</td>
          <td className="">{object.totalEach}</td>
          <td className="">{object.sku}</td>
          <td className="">{object.dateEx}</td>
        </tr>       
    );


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
            <table className="w3-table w3-bordered w3-hoverable">
            <tr className="d-flex justify-content-between" style={styles.table}>
                <th>LINES</th>
                <th>ITEM</th>
                <th>QTY</th>
                <th>UOM</th>
                <th>TOTAL EA</th>
                <th>SKU</th>
                <th>DATE EXPECTED</th>
            </tr>
            <tbody>{table}</tbody>
        </table>
        <button className="w3-button w3-light-grey" style={styles.cancelButton}>CANCEL</button>  
        <button className="w3-button w3-light-grey" style={styles.cancelButton}>SUBMIT</button>  
        </div>
    )
}

const styles = {
    constainer: {
        position: "relative",
        left: "41vh",
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
        marginTop: "1vh"
    },
    cancelButton: {
        width: "15vh",
        marginRight: "4vh",
        marginTop: "4vh"
    }
}

export default CreateOrder;