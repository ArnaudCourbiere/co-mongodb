module.exports.open = function (db) {
  return function (cb) {
    db.open(cb);
  };
};

module.exports.close = function(db, forceClose) {
  forceClose = forceClose || false;
  return function (cb) {
    db.close(forceClose, cb);
  };
};

module.exports.admin = function (db) {
  return function (cb) {
    db.admin(cb);
  };
};

module.exports.collectionsInfo = function (db, collectionName) {
  return function (cb) {
    db.collectionsInfo(collectionName, cb);
  };
};

module.exports.collectionNames = function (db, collectionName, options) {
  options = options || {};
  return function (cb) {
    db.collectionNames(collectionName, options, cb);
  };
};

module.exports.collection = function (db, collectionName, options) {
  options = options || {};
  return function (cb) {
    db.collection(collectionName, options, cb);
  };
};

module.exports.collections = function (db) {
  return function (cb) {
    db.collections(cb);
  };
};

module.exports.eval = function (db, code, parameters, options) {
  options = options || {};
  return function (cb) {
    db.eval(code, parameters, options, cb);
  };
};

// TODO: implement derefence after looking at DBRef

module.exports.logout = function (db) {
  return function (cb) {
    db.logout(cb);
  };
};

module.exports.authenticate = function (db, username, password, options) {
  options = options || {};
  return function (cb) {
    db.authenticate(username, password, options, cb);
  };
};

module.exports.addUser = function (db, username, password, options) {
  options = options || {};
  return function (cb) {
    db.addUser(username, password, options, cb);
  };
};

module.exports.removeUser = function(db, username, options) {
  options = options || {};
  return function (cb) {
    db.removeUser(username, options, cb);
  };
};

module.exports.createCollection = function (db, collectionName, options) {
  options = options || {};
  return function (cb) {
    db.createCollection(collectionName, options, cb);
  };
};
