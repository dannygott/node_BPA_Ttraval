var request = require('request');
var key = require('../config.json').airportAPIKey;

var verifyCode = function(code,cb) {
    request.get("https://iatacodes.org/api/v6/airports",
        {form: { api_key: key, code: code }},
        (err, resp, body) => {
            if (err) throw err;
            body = JSON.parse(body);
            if (body.response[0]) {
                cb(true);
            } else {
                cb(false);
            }
    });
}

verifyCode('JFK', (result) => {
    console.log(result);
});

module.exports = {
    verifyCode: verifyCode,
}
