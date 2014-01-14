co-mongodb
==========

[![Build Status](https://travis-ci.org/ArnaudCourbiere/co-mongodb.png?branch=master)](https://travis-ci.org/ArnaudCourbiere/co-mongodb)

Manipulation library to use the mongodb native driver with generator based flow control libraries such as [co](https://github.com/visionmedia/co).

## Instalation

```
$ npm install co-mongodb
```
## Example

```js
var comongo = require('co-mongodb');

co(function *() {
  // db is just a regular Db instance from the native driver.
  db = yield comongo.client.connect('mongodb://localhost:27017/test');
  
  // The same goes for collection.
  var collection = yield comongo.db.collection(db, 'testCollection');
  
  var result = yield comongo.db.addUser(db, 'user', 'pass');
  var user = result[0];
  yield comongo.db.removeUser(db, 'user');
  
  yield comongo.db.close(db);
})();
```
Warning: This module is stil under development, for now MongoClient and Db functions are supported, more to come soon.
