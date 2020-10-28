
/**
* Live received object functions definition mentioned here .
**/
var myModule = require('../constants.js');

const dataFormation = (completeData, name, receivedData) => {
 // findIndex to name is exist ot not. If exists object get update else push object
    const foundIndex = completeData.findIndex(el => el.name === name);
    if (foundIndex === -1) {
        receivedData = updateObject(receivedData, foundIndex, completeData);
        completeData.push(receivedData);
    } else {
        receivedData = updateObject(receivedData, foundIndex, completeData);
        completeData[foundIndex] = receivedData;
    }
    return completeData;
}

// function to foemat the object element and calculate midprice 
const updateObject = (receivedData, foundIndex, completeData) => {
    var existArray = [];
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    if (foundIndex != -1) {
        existArray = completeData[foundIndex][myModule.MIDPRICE_LABEL];
    }
    receivedData.bestAsk = receivedData.bestAsk.toFixed(6);
    receivedData.bestBid = receivedData.bestBid.toFixed(6);
    receivedData.lastChangeAsk = receivedData.lastChangeAsk.toFixed(6);
    receivedData.lastChangeBid = receivedData.lastChangeBid.toFixed(6);
    receivedData.openAsk = receivedData.openAsk.toFixed(6);
    receivedData.openBid = receivedData.openBid.toFixed(6);
   // let newVal = (Number(receivedData.bestAsk) + Number(receivedData.bestBid)) / 2;
   //calculate midprice
   let newVal = calculateMidprice(receivedData.bestAsk,receivedData.bestBid);
   existArray.push({ "dataTime": currentTime, "dataMPrice": newVal });
    // filter between 30 seconds data.
    const filterPrice = filterByTime(existArray);
   //const filterPrice = existArray.filter(itemTime => (currentTime - itemTime.dataTime) <= 30000);
    receivedData.midPrice = filterPrice;

    return receivedData;
}

const calculateMidprice = (bestAskRec,bestBidRec) => {
    return (Number(bestAskRec) + Number(bestBidRec)) / 2;
}

const filterByTerm = (inputArr, searchTerm) => {
    return inputArr.filter(function(arrayElement) {
      return arrayElement.url.match(searchTerm);
    });
  }

  const filterByTime = (midPriceArray) => {
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    return midPriceArray.filter(itemTime => (currentTime - itemTime.dataTime) <= 30000);
  }

 const sortByChangeBid = (sortObject) =>{
     return sortObject.sort(function (a, b) { return b.lastChangeBid - a.lastChangeBid });
 } 
module.exports = { dataFormation, filterByTerm, sortByChangeBid, filterByTime, calculateMidprice};