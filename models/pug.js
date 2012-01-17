var Pug = function () {
   if (arguments.length == 1) {
     this.constructFromUrl.apply(this, arguments);
   }
   if (arguments.length == 2) {
     this.constructFromParts.apply(this, arguments);
   }
};

Pug.prototype.constructFromUrl = function(tumblrUrl) {
   this.img = tumblrUrl;
   this.url = makeLocalUrl(tumblrUrl);
};

Pug.prototype.constructFromParts = function(server, tumblrId) {
   var tumblrUrl = 'http://' + server + '.media.tumblr.com/tumblr_' + tumblrId + '_500.jpg';
   this.constructFromUrl(tumblrUrl);
};

var makeLocalUrl = function (tumblrUrl) {
   var server = tumblrUrl.match(/\d+/);
   var tumblrId = tumblrUrl.match(/tumblr_([^_]+)/i)[1];
   return '/' + server + '/' + tumblrId;
};

module.exports = Pug;