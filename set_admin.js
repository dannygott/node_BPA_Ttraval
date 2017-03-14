var r = require('rethinkdb');

var dbConfig = require('./config.json').dbConfig;

r.connect(dbConfig, function(err, conn) {
    r.table('users').get('admin').delete().run(conn);

    r.table('users').insert({
        id: 'admin',
        password: '$2a$10$vkw96VGIneGG0uYCjQRIuuo74fV7J6MzMQV5oC.y2XH/xBpEjevvm',
        airport: 'PHL',
        group: 'admin'
    }).run(conn,function(err, result) {
        if (err) throw err;

        process.exit(0);
    });
});
