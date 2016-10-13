var request = require('request');

function conversionUpdate(callback){
  var body,err; // make these global

  request('http://api.fixer.io/latest?base=USD', function (err, response, body) {
    if (!err && response.statusCode == 200) {
        body = JSON.parse(body);
    } else {
      callback(err);
    }
  });
  r.db('travel').tableCreate('conversion').run(conn, function(err){
    if (err != "ReqlOpFailedError" || null || undefined) {
        callback(err);
    }
    r.table("conversion").insert(body, {conflict : "update"}).run(conn, function(err) {
      if (err) callback(err);
    });
  });
  callback(err)
}
