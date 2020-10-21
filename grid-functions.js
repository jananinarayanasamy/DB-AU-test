/**
* Live table related functions definition mentioned here .
**/



var myModule = require('./constants.js');

function DeleteRows() {
  var rowCount = document.getElementById(myModule.TABLE_DISPLAY_COLNAME).rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    document.getElementById(myModule.TABLE_DISPLAY_COLNAME).deleteRow(i);
  }
}

function generateTable(table, data) {
  try{
    let i = 1;
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        if (key !== myModule.MIDPRICE_LABEL) {
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        } else {

          var newSpan = document.createElement('span');
          let sid = myModule.MIDPRICE_LABEL + i;
          newSpan.setAttribute(myModule.CELL_ATTRIBUTE_ID, sid);
          cell.appendChild(newSpan);
          try{
            drawSparkLine(element[key], sid);
          } catch(e) {
            document.getElementById('error-message').innerHTML = "Data Missing";
          }
        

        }
      }
      i++;
    }
  } catch(e) {
    document.getElementById('error-message').innerHTML = "Data not found";
  }
}

function drawSparkLine(sparkValue, spanId) {
  sparkLineValue = sparkValue.map(spVal => spVal.dataMPrice);
  const realSparkline = document.getElementById(spanId)
  Sparkline.draw(realSparkline, sparkLineValue);
}

module.exports = { DeleteRows, generateTable };
