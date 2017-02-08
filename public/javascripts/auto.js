var oldLocalCurrency
var oldDestCurrency
var converted
var answer
var currency = "EUR"

function convert() {
  getRate(currency, function main(rate) {
  console.log("bla");
  var localCurrency = document.getElementById('localCurrency').value
  var destCurrency = document.getElementById('destCurrency').value
  getRate(currency)
  if ((oldDestCurrency == destCurrency || oldDestCurrency == "")&& localCurrency != oldLocalCurrency || destCurrency == "") {
   converted = localCurrency*rate
   document.getElementById("destCurrency").value = converted;
 }else {
    converted = destCurrency/rate
    document.getElementById("localCurrency").value = converted;
  }
  oldDestCurrency = destCurrency
  oldLocalCurrency = localCurrency
  })
}
function getRate(currencyTo, callback){
  $.getJSON('http://api.fixer.io/latest?base=USD', function( data ) {
    var rate = data.rates[currencyTo]
    callback (rate)
  });
}
