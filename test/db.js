var assert = require('assert');
var co = require('co');
var comongo = require('..');
var mongodb = require('mongodb');

describe('db', function () {
  var db;
  
  beforeEach(function (done) {
    co(function *() {
      db = yield comongo.client.connect('mongodb://localhost:27017/test');
    })(done);
  });
  afterEach(function (done) {
    db.close(done);
    db = undefined;
  });
  
  describe('#open()', function () {
    it('should initialize the database connection', function (done) {
      co(function *() {
        // Use a db that is not connected yet.
        var db = new  mongodb.Db('test', new mongodb.Server('localhost', 27017), { safe: true });
        var indexInfo = yield comongo.db.open(db);
        assert.notEqual(indexInfo, null);
        assert.strictEqual(indexInfo.databaseName, 'test');
        assert.ok(indexInfo.openCalled);
        db.close();
      })(done);
    });
  });
  
  describe('#close()', function () {
    it('should close the current database connection', function (done) {
      co(function *() {
        var result = yield comongo.db.close(db);
        assert.strictEqual(typeof result, 'undefined');
      })(done);
    });
  });
  
  describe('#admin()', function () {
    it('should return the admin db', function (done) {
      co(function *() {
        var adminDb = yield comongo.db.admin(db);
        assert.ok(adminDb instanceof mongodb.Admin);
      })(done);
    });
  });
  
  describe('#collectionsInfo()', function () {
    it('should return a cursor to the collection information', function (done) {
      co(function *() {
        var cursor = yield comongo.db.collectionsInfo(db);
        assert.ok(cursor instanceof mongodb.Cursor);
      })(done);
    });
  });
  
  describe('#collectionNames()', function () {
    it('sould get a list of collection names', function (done) {
      co(function *() {
        var collectionNames = yield comongo.db.collectionNames(db);
        assert.ok(collectionNames instanceof Array);
      })(done);
    });
  });
  
  describe('#collection()', function () {
    it('should fetch a collection', function (done) {
      co(function *() {
        var collection = yield comongo.db.collection(db, 'testCollection');
        assert.ok(collection instanceof mongodb.Collection);
      })(done);
    });
  });
  
  describe('#collections()', function () {
    it('should fetch all collections', function (done) {
      co(function *() {
        var collections = yield comongo.db.collections(db);
        assert.ok(collections instanceof Array);
      })(done);
    });
  });
  
  describe('#eval()', function () {
    it('should evaluate javascript code on the server', function (done) {
      co(function *() {
        var result = yield comongo.db.eval(db, 'function (x, y) { return x + y; }', [2, 3]);
        assert.strictEqual(result, 5);
      })(done);
    });
  });
  
  // TODO: test dereference when implemented.
  
  describe('#logout()', function () {
    it('should logout user from the server', function (done) {
      co(function *() {
        var result = yield comongo.db.logout(db);
        assert.strictEqual(result, true);
      })(done);
    });
  });
  
  describe('#authenticate()', function () {
    it('should authenticate a user against the server', function (done) {
      db.addUser('user1', 'pass', function (err, result) {
        assert.strictEqual(err, null);
        
        co(function *() {
          var result = yield comongo.db.authenticate(db, 'user1', 'pass');
          assert.strictEqual(result, true);
          db.removeUser('user1', function (err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, true);
            done();
          });
        })();
      });
    });
  });

  describe('#addUser()', function () {
    it('should add a user to the database', function (done) {
      co(function *() {
        var result = yield comongo.db.addUser(db, 'user2', 'pass');
        assert.ok(result instanceof Array);
        assert.strictEqual(result.length, 1);
        var user = result[0];
        assert.strictEqual(user.user, 'user2');
        assert.ok(user.hasOwnProperty('pwd'));
        db.removeUser('user2', function (err, result) {
          assert.strictEqual(err, null);
          assert.strictEqual(result, true);
          done();
        });
      })();
    });
  });
  
  describe('#removeUser()', function () {
    it('should remove a user from the database', function (done) {
      co(function *() {
        yield comongo.db.addUser(db, 'user3', 'pass');
        var result = yield comongo.db.removeUser(db, 'user3');
        assert.strictEqual(result, true);
      })(done);
    });
  });
  
  describe('#createCollection()', function () {
    it('should create a collection on the server', function (done) {
      co(function *() {
        var collection = yield comongo.db.createCollection(db, 'testCollection');
        assert.ok(collection instanceof mongodb.Collection);
        db.dropCollection('testCollection', function (err, result) {
          assert.strictEqual(err, null);
          assert.strictEqual(result, true);
          done();
        });
      })();
    });
  });
});
