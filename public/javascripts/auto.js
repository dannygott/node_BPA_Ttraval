var oldLocalCurrency
var oldDestCurrency
var converted
var rate = 2
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
