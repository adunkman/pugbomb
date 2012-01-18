var rest = require('restler'),
    Pug = require('../models/pug');

var pugme = {
  random: function (callback) {
    rest.get('http://pugme.herokuapp.com/random')
        .on('success', function (data) { callback(null, data['pug']); })
        .on('fail', function (data) { callback(data); })
        .on('error', function (error) { callback(error); })
        .on('abort', function () { callback('Request aborted.'); });
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

  findByName: function (server, key) {
    return function (request, response, next) {
      var data = Pug.getRemoteUrl(request.params[server], request.params[key]);

      response.data = {
        pug: new Pug(data)
      };

      next();
    };
  }
};