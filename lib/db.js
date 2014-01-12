module.exports.open = function (db) {
  return function (cb) {
    db.open(cb);
  };
};