//for establishing connection with the mongo database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/productDB";
var connection = {};

connection.getConnection = function() {
    return MongoClient.connect(url).then(function(database) {
        return database.db;
    })
}
module.exports = connection;