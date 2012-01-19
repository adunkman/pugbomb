var Pug = function (remoteUrl) {
   this.img = remoteUrl;
   this.url = Pug.getLocalUrl(remoteUrl);
};

Pug.getRemoteUrl = function (server, key, size, format) {
  return 'http://' + server + '.media.tumblr.com/' +
    'tumblr_' + key + '_' + size + '.' + format;
};

Pug.getLocalUrl = function (remoteUrl) {
  var parsed = remoteUrl.match(/http:\/\/(\d+).media.tumblr.com\/tumblr_([^_]+)_(\d+).(\w+)/);
  if (!parsed || parsed.length != 5) throw "Unexpected URL format.";

  var server = parsed[1],
      key = parsed[2],
      size = parsed[3],
      format = parsed[4];

  return '/' + server + '/' + size + '/' + key + '.' + format;
};

module.exports = Pug;