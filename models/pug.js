var Pug = function (remoteUrl) {
   this.img = remoteUrl;
   this.url = Pug.getLocalUrl(remoteUrl);
};

Pug.getRemoteUrl = function (server, key) {
  return 'http://' + server + '.media.tumblr.com/tumblr_' + key + '_500.jpg';
};

Pug.getLocalUrl = function (remoteUrl) {
  var server = remoteUrl.match(/\d+/);
  var key = remoteUrl.match(/tumblr_([^_]+)/i)[1];
  return '/' + server + '/' + key;
};

module.exports = Pug;