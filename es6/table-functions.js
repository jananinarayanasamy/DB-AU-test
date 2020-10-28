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
        tableData.forEach(data => {
        // create data to pass sparkline //
        const sparkValue = data.midPrice;
        const sparkLineValue = sparkValue.map(spVal => spVal.dataMPrice);
        // create <tr> and <td> and bind in tbody//
        const row = document.createElement("tr");
        row.innerHTML = `<td>${data.name}</td><td>${data.bestBid}</td><td>${data.bestAsk}</td><td>${data.openBid}</td><td>${data.openAsk}</td><td>${data.lastChangeAsk}</td><td>${data.lastChangeBid}</td><td><span class='sparkline'></span></td>`;
        const sparkline = new Sparkline(row.querySelector("span.sparkline"));
        document.getElementById(myModule.TABLE_ROW_COLNAME).appendChild(row);
        sparkline.draw(sparkLineValue);
        })

    }catch(e) {
        document.getElementById('error-message').innerHTML = "Data not found";
    }

   }

// export functions
module.exports = { generateTable, DeleteRows };