var request = require('request');
var answer
function convert(ammount, currencyTo){
  $.get('http://api.fixer.io/latest?base=USD', function( data ) {
    JSON.parse(data);
    return data.currencyTo
  });

}
