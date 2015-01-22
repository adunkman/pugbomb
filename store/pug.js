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
        
        var matchFirstURL = data.match(/http:[^"]+/),
            firstURL = matchFirstURL && matchFirstURL[0];
        
        response.data = {
          pug: new Pug(firstURL)
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