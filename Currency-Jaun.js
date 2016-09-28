var request = require('request');
var function DB_Conversionupdate(callback){
  var body
  var err
  request('http://api.fixer.io/latest', function (err, response, body) {
    if (!err && response.statusCode == 200) {
      // Hold on let me shit a bunch of json all over this fuck
      JSON.parse(body);
    }else {
      callback(err);
    }
  })
  r.db('T_info').tableCreate('conversion').run(conn, function(err){
    if (err != "ReqlOpFailedError" || null || undefined) {
        callback(err);
    }
    r.table("conversion").insert(body, {conflict : "update"}).run(conn, function(err) {
      if (err) callback(err);
    });
  });



  callback(err)


}
