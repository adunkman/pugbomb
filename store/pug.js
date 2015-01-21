var rest = require('restler'),
    Pug = require('../models/pug');

var pugme = {
  random: function (callback) {
    rest.get('http://pugme.herokuapp.com/random')
        .once('success', function (data) { callback(null, data['pug']); })
        .once('fail', function (data) { callback(data); })
        .once('error', function (error) { callback(error); })
        .once('abort', function () { callback('Request aborted.'); });
  }
};

module.exports = {
  find: function (numberOfPugs) {
    return function (request, response, next) {
      pugme.random(function (error, data) {
        if (error) next(error);

        response.data = {
          pug: new Pug(data)
        };

        next();
      });
    };
  },

  findByName: function (server, key, size, format) {
    return function (request, response, next) {
      var data = Pug.getRemoteUrl(request.params[server], request.params[key],
        request.params[size], request.params[format]);

      response.data = {
        pug: new Pug(data)
      };

      next();
    };
  }
};