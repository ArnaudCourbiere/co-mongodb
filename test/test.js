var assert = require('assert');
var co = require('co');
var mongo = require('..');
var mongodb = require('mongodb');

describe('Getting the DB', function () {
    it('should return the DB', function (done) {
        co(function *() {
            var db = yield mongo.getDb('mongodb://localhost:27017/test');
            
            assert.ok(db instanceof mongodb.Db);
        })(done);
    });
});

describe('Geting a collection', function () {
    it('should return the collection', function (done) {
        co(function *() {
            var db = yield mongo.getDb('mongodb://localhost:27017/test');
            var collection = yield mongo.getCollection(db, 'testcollection');
            
            assert.ok(collection instanceof mongodb.Collection);
        })(done);
    });
});

describe('Getting a cursor as an array', function () {
    it('should return a cursor as an array', function (done) {
        co(function *() {
            var db = yield mongo.getDb('mongodb://localhost:27017/test');
            var collection = yield mongo.getCollection(db, 'testcollection');
            var items = yield mongo.cursorToArray(collection.find());
            
            assert.ok(items instanceof Array);
            assert.ok(items.length === 0);
        })(done);
    });
})
