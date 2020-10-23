// improt constant variable file
var myModule = require('../constants.js');

// function to delete all row before render
const DeleteRows = () => {
    var rowCount = document.getElementById(myModule.TABLE_ROW_COLNAME).rows.length;
    for (let i = rowCount - 1; i >= 0; i--) {
        document.getElementById(myModule.TABLE_ROW_COLNAME).deleteRow(i);
    }
}

// function to build table row and draw sparkLine
const generateTable = (tableData) => {
    try{
        for (index in tableData) {
            // create data to pass sparkline //
            const sparkValue = tableData[index].midPrice;
            const sparkLineValue = sparkValue.map(spVal => spVal.dataMPrice);
    
            // create <tr> and <td> and bind in tbody//
            const row = document.createElement("tr");
            row.innerHTML = `<td>${tableData[index].name}</td><td>${tableData[index].bestBid}</td><td>${tableData[index].bestAsk}</td><td>${tableData[index].openBid}</td><td>${tableData[index].openAsk}</td><td>${tableData[index].lastChangeAsk}</td><td>${tableData[index].lastChangeBid}</td><td><span class='sparkline'></span></td>`;
            const sparkline = new Sparkline(row.querySelector("span.sparkline"));
            document.getElementById(myModule.TABLE_ROW_COLNAME).appendChild(row);
            sparkline.draw(sparkLineValue);
        }
    }catch(e) {
        document.getElementById('error-message').innerHTML = "Data not found";
    }
   

}

// export functions
module.exports = { generateTable, DeleteRows };