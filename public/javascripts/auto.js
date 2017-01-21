var oldLocalCurrency
var oldDestCurrency
var converted

// need to grab from backend
var rate = 2
// need to grab from backend

function convert() {
  var localCurrency = document.getElementById('localCurrency').value
  var destCurrency = document.getElementById('destCurrency').value
  console.log(localCurrency);
  if ((oldDestCurrency == destCurrency || oldDestCurrency == "")&& localCurrency != oldLocalCurrency || destCurrency == "") {
   converted = localCurrency*rate
   document.getElementById("destCurrency").value = converted;
 }else {
    converted = destCurrency/rate
    document.getElementById("localCurrency").value = converted;
  }
  oldDestCurrency = destCurrency
  oldLocalCurrency = localCurrency
}
