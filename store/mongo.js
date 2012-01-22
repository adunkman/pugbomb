var rest = require('restler'),
    db = require('mongodb'),
    uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/pugbomb',
    Pug = require('../models/pug');

var mongo = {
  random: function (callback) {
    db.connect(uri, function (error, connection) {
      if (error) return callback(error);

      connection.collection('pugs', function (error, pugs) {
        if (error) return callback(error);
        pugs.ensureIndex({ approved: 1, random: 1 });

        var randomNumber = Math.random();
        pugs.findOne({ approved: true,  random: { '$gte': randomNumber }}, function (error, pug) {
          if (error) return callback(error);
          if (pug) return callback(null, pug);

          pugs.findOne({ approved: true, random: { '$lte': randomNumber }}, function (error, pug) {
            if (error) return callback(error);
            if (pug) return callback(null, pug);
            return callback ('Couldn\'t find any pugs!');
          });
        });
      })
    });
  },
  save: function (pug, callback) {
    if (!pug.random) { pug.random = Math.random(); }

    db.connect(uri, function (error, connection) {
      if (error) return callback(error);

      connection.collection('pugs', function (error, pugs) {
        if (error) return callback(error);
        pugs.save(pug);
      });
    });
  }
};

module.exports = mongo;