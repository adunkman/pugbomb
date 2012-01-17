var rest = require('restler'),
    Pug = require('./models/pug');

var convertObjectToPugs = function (data) {
   var pugData = data.pugs,
       pugs = [];

   if (pugData) {
      for (var i = 0; i < pugData.length; i++) {
         pugs[i] = new Pug(pugData[i]);
      }
   }

   return pugs;
};

var getRandomPugs = function (numberOfPugs, callback) {
  rest.get('http://pugme.herokuapp.com/bomb?count=' + numberOfPugs)
      .on('success', function (data) {
        var pugs = convertObjectToPugs(data);
        if (pugs.length == 1) { pugs = pugs[0]; }
         callback(null, pugs);
      })
      .on('fail', function (data) { callback(data); })
      .on('error', function (error) { callback(error); })
      .on('abort', function () { callback('Request aborted.'); });
};

var getSpecificPug = function (server, tumblrId, callback) {
  callback(null, new Pug(server, tumblrId));
};

module.exports = {
   get: function () {
      if (arguments.length == 2) { getRandomPugs.apply(this, arguments); }
      if (arguments.length == 3) { getSpecificPug.apply(this, arguments); }
   }
};