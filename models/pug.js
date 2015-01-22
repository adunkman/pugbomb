var util = require('util');

var Pug = function (remoteUrl) {
   this.img = remoteUrl;
   this.url = Pug.getLocalUrl(remoteUrl);
};

Pug.getRemoteUrl = function (server, directory, key, size, format) {
  return util.format('http://%s.media.tumblr.com/%stumblr_%s_%d.%s', server, (directory ? directory + '/' : ''), key, size, format);
};

Pug.getLocalUrl = function (remoteUrl) {
  var parsed = remoteUrl.match(/http:\/\/(\d+).media.tumblr.com\/(\w*\/{0,1})tumblr_([^_]+)_(\d+).(\w+)/);
  
  if (!parsed || parsed.length != 6) throw "Unexpected URL format.";

  var server = parsed[1],
      directory = parsed[2],
      key = parsed[3],
      size = parsed[4],
      format = parsed[5];

  return util.format('%s/%s%s/%s/%s', server, (directory ? directory + '/' : ''), size, key, format);
};

module.exports = Pug;