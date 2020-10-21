
 /**
 * Live received object functions definition mentioned here .
 **/
var myModule = require('./constants.js');

function dataFormation(completeData, name,receivedData) {
    const { length } = completeData;
   
   
    const foundIndex = completeData.findIndex(el => el.name === name);
    if(foundIndex === -1){
        receivedData = updateObject(receivedData,foundIndex,completeData);
        completeData.push(receivedData);
    }else{   
        receivedData = updateObject(receivedData,foundIndex,completeData);
        completeData[foundIndex] = receivedData;
    }
    return completeData;
  }

  function updateObject(receivedData,foundIndex,completeData){
    var  existArray = [];
    var currentDate = new Date();
    var currentTime = currentDate.getTime(); 
    if( foundIndex != -1){
        existArray = completeData[foundIndex][myModule.MIDPRICE_LABEL];
    }
    receivedData.bestAsk = receivedData.bestAsk.toFixed(6);
    receivedData.bestBid = receivedData.bestBid.toFixed(6);
    receivedData.lastChangeAsk = receivedData.lastChangeAsk.toFixed(6);
    receivedData.lastChangeBid = receivedData.lastChangeBid.toFixed(6);
    receivedData.openAsk = receivedData.openAsk.toFixed(6);
    receivedData.openBid = receivedData.openBid.toFixed(6);
    let newVal = (Number(receivedData.bestAsk) + Number(receivedData.bestBid)) / 2;
    existArray.push({"dataTime":currentTime,"dataMPrice":newVal});
    filterPrice = existArray.filter(itemTime => (currentTime - itemTime.dataTime) <= 30000 );
    receivedData.midPrice = filterPrice;

    return receivedData;
  }


  module.exports = {dataFormation};