var assert = require('assert');
var co = require('co');
var comongo = require('..');
var mongodb = require('mongodb');

describe('db', function () {
  var db;
  
  beforeEach(function () {
    db = new mongodb.Db('test', new mongodb.Server('localhost', 27017), { safe: true });
  });
  afterEach(function (done) {
    db.close(done);
    db = undefined;
  });
  
  describe('#open()', function () {
    it('should initialize the database connection', function (done) {
      co(function *() {
        var indexInfo = yield comongo.db.open(db);
        assert.notEqual(indexInfo, null);
        assert.equal(indexInfo.databaseName, 'test');
        assert.ok(indexInfo.openCalled);
      })(done);
    });
  });
  
  /*
  describe('#close()', function () {
    it('should close the current database connection', function (done) {
      done();
    })
  });
  */
});