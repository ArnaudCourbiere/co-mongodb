var MongoClient = require('mongodb').MongoClient;

module.exports.getDb = function (connectionString) {
    return function (cb) {
        MongoClient.connect(connectionString, cb);
    };
}

module.exports.getCollection = function (db, collectionName) {
    return function (cb) {
        db.collection(collectionName, cb);
    };
}

module.exports.cursorToArray = function (cursor) {
    return function (cb) {
        cursor.toArray(cb);
    };
}