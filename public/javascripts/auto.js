var oldLocalCurrency
var oldDestCurrency
var converted
var answer
var currency = "EUR"

function convert() { // main function
  getRate(currency, function main(rate) { // takes input of (rate) and currency converting them and returning the result
  console.log("bla");
  var localCurrency = document.getElementById('localCurrency').value
  var destCurrency = document.getElementById('destCurrency').value
  getRate(currency)
  if ((oldDestCurrency == destCurrency || oldDestCurrency == "")&& localCurrency != oldLocalCurrency || destCurrency == "") { // make shure the right field is being replaced with the converted value
   converted = localCurrency*rate
   document.getElementById("destCurrency").value = converted;
 }else{
    converted = destCurrency/rate
    document.getElementById("localCurrency").value = converted;
  }
  oldDestCurrency = destCurrency
  oldLocalCurrency = localCurrency // set old currencies so that we know if a new val has been imputed
  })
}
function getRate(currencyTo, callback){
  $.getJSON('https://api.fixer.io/latest?base=USD', function( data ) {
    var rate = data.rates[currencyTo]
    callback (rate)
  });
}
