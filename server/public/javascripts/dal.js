//All connection with database and CRUD operations are performed here
var connection = require('./dbConnection');
var dal = {};
let db;

dal.getAllProducts = async() => {
    if (!db) db = await connection.getConnection();
    return db.collection('products').find({}).toArray();
}
dal.getProductByName = async(pName) => {
    if (!db) db = await connection.getConnection();
    return db.collection('products').findOne({ 'pName': pName });
}
dal.addProduct = async(data) => {
    if (!db) db = await connection.getConnection();
    return db.collection('products').insertOne(data);
}
module.exports = dal;