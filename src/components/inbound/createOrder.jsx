import React from "react";

const CreateOrder = () => {

    const testData = [
        {
            line: "1",
            item: "Hydrocodone",
            qty: "1",
            uom: "PALLET",
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
        <tr className="d-flex justify-content-between text-center" style={{ width: "150vh"}}>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.line}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.item}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.qty}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.uom}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.totalEach}</td>
          <td className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">{object.sku}</td>
          <td className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2">{object.dateEx}</td>
        </tr>       
    );


    return(
        <div style={styles.container}>
            <h1>Inbound / Create Order</h1>
            ITEM: <input type="text" placeholder="SEARCH BY SKU OR DESCRIPTION" style={styles.searchBar} /> <br/>
            <div style={{ marginTop: "3vh" }}>
                QUANTITY: <input type="text" style={styles.quantityBar} />
                UOM: <select>
                        <option value="" disabled selected>Options</option>
                        <option value="PALLET">PALLET</option>
                        <option value="CASES">CASES</option>
                        <option value="KITS">KITS</option>
                        <option value="EACHES">EACHES</option>
                    </select>
            </div>   
            DATE EXPECTED: <input type="date" style={styles.dateExpected} /> <br/>
            <button className="w3-button w3-light-grey" style={styles.addLine}>ADD LINE</button>  
            <hr/> 
            <h5>Lines in Order</h5> 
            <table className="w3-table w3-bordered w3-hoverable w3-striped">
            <tr className="d-flex justify-content-between" style={{ width: "150vh"}}>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">LINES</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">ITEM</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">QTY</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">UOM</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">TOTAL EA</th>
                <th className="col-1 col-xl-1 col-lg-1 col-md-1 col-sm-1">SKU</th>
                <th className="col-2 col-xl-2 col-lg-2 col-md-2 col-sm-2">DATE EXPECTED</th>
            </tr>
            <tbody>{table}</tbody>
        </table>
        <button className="w3-button w3-light-grey" style={styles.cancelButton}>CANCEL</button>  
        <button className="w3-button w3-light-grey" style={styles.cancelButton}>SUBMIT</button>  
        </div>
    )
}

const styles = {
    container: {
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