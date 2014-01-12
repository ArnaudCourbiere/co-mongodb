module.exports.connect = function (client, url, options) {
  if (typeof client === 'string') {
    url = client;
    options = url;
    client = require('mongodb').MongoClient;
  }
  
  return function (cb) {
    client.connect(url, options, cb);
  };
};

module.exports.open = function (client) {
  return function (cb) {
    client.open(cb);
  };
};

module.exports.close = function (client) {
  return function (cb) {
    client.close(cb);
  };
};