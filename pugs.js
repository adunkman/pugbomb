var rest = require('restler');

var Pug = function (url) {
   this.id = url.split(/a/i);
   this.url = url;
};

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

module.exports = {
   get: function (numberOfPugs, callback) {
      rest.get('http://pugme.herokuapp.com/bomb?count=' + numberOfPugs)
          .on('success', function (data) {
             callback(null, convertObjectToPugs(data));
          })
          .on('fail', function (data) { callback(data); })
          .on('error', function (error) { callback(error); })
          .on('abort', function () { callback('Request aborted.'); });
   }
};