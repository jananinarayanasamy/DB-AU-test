/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

/* 
 ---Below line added by Janani---
 ---For the purpose of including files.---
*/

var myModule = require('./constants.js');
var tableFunction = require('./es6/table-functions.js');
var socketReceivedObject = require('./es6/data-formation.js');

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function (msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

const connectCallback = () => {
  document.getElementById('stomp-status').innerHTML = "Successfully connected to a stomp server."
  /* 
   ---Below line added by Janani---
   ---For the purpose of Subscribe to a STOMP location.---
  */
  const subscription = client.subscribe("/fx/prices", subscriptionCallback);
 // console.log("subscription",subscription)
}

client.connect({}, connectCallback, function (error) {
  alert(error.headers.message)
})

/* 
 ---Below line added by Janani---
 ---For the purpose of Subscribe CallBackFunction.---
*/

var currencyData = [];
const subscriptionCallback = (res) => {
  var responseObj = JSON.parse(res.body);
  // Function to formating recevied Object //
  currencyData = socketReceivedObject.dataFormation(currencyData, responseObj.name, responseObj);
  // Add to sort well defined object // 
  currencyData = socketReceivedObject.sortByChangeBid(currencyData);
  // function to delete all rows //
  tableFunction.DeleteRows();
  // function to generated rows // 
  tableFunction.generateTable(currencyData);
}

module.exports = { subscriptionCallback, connectCallback };