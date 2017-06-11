var mongojs = require('mongojs');

var dbUrl = process.env.DB_USER + ":"
    +  process.env.DB_PASS + "@"
    +  process.env.DB_HOST + ":"
    +  process.env.DB_PORT + "/"
    +  process.env.DB_NAME;

var db = mongojs(dbUrl, ['groups', 'user_profiles']);

exports.db = db;