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
var socketReceivedObject = require('./object-formation.js');
var gridFunction = require('./grid-functions.js');

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  document.getElementById('stomp-status').innerHTML = "Successfully connected to a stomp server."
/* 
 ---Below line added by Janani---
 ---For the purpose of Subscribe to a STOMP location.---
*/
  var subscription = client.subscribe("/fx/prices", subscriptionCallback);
 
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})

/* 
 ---Below line added by Janani---
 ---For the purpose of Subscribe CallBackFunction.---
*/

var currencyData=[] ;
function subscriptionCallback(res) {
  var responseObj = JSON.parse(res.body);
  currencyData = socketReceivedObject.dataFormation(currencyData, responseObj.name,responseObj);
  currencyData = currencyData.sort(function(a, b){return b.lastChangeBid - a.lastChangeBid});
  gridFunction.DeleteRows();
  let table = document.getElementById(myModule.TABLE_DISPLAY_COLNAME);
  gridFunction.generateTable(table, currencyData); 
 }
