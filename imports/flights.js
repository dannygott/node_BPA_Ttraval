var request = require('request');
var key = require('../config.json').airportAPIKey;

var verifyCode = function(code,cb) {
    request.get("https://iatacodes.org/api/v6/airports",
        {form: { api_key: key, code: code }},
        (err, resp, body) => {
            if (err) throw err;
            console.log(body);
            body = JSON.parse(body);
            if (body.response) {
                cb(true);
            } else {
                cb(false);
            }
    });
}

verifyCode('MMPHL', (result) => {
    console.log(result);
});

module.exports = {
    verifyCode: verifyCode,
}
