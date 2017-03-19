var fs = require('fs');
var lineread = require('readline');
var moment = require('moment');
var winston = require('winston');

var winston = new(winston.Logger)({ // winston for logging
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({
            filename: 'DBlog.log'
        })
    ]
});

var readLog = function() {
    var arr = fs.readFileSync('DBlog.log').toString().split('\n');

    for (i in arr) {
        if (arr[i] != '')
            arr[i] = JSON.parse(arr[i]);
            arr[i].timestamp = moment(arr[i].timestamp).format('MMM Do h:mm A');
    }

    return arr;
};

var deleteLog = function() {
    fs.unlinkSync('DBlog.log');
    winston.info('Logs reset');
};

module.exports = {
    readLog: readLog,
    deleteLog: deleteLog
}
