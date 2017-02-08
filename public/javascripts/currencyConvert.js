var request = require('request');
var answer
function convert(ammount, currencyFrom, currencyTo){
  $.get('http://api.fixer.io/latest?base=USD', function( data ) {
    JSON.parse(data);
    if (currencyFrom == "USD") {
      answer = ammount / data.currencyTo
    }else {
      answer = ammount * data.currencyFrom
    }
    return answer

  });

}
