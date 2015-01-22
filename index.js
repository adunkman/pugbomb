var stylus = require('stylus'),
    express = require('express'),
    path = require('path'),
    pugstore = require('./store/pug'),
    view = require('./view')
    app = express(),
    port = process.env.PORT || 3000,
    errorHandler = require('errorhandler');

app.set('view engine', 'jade');

if ('development' == app.get('env')) {
  app.use(stylus.middleware({ src: path.join(__dirname, 'public') }));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

if ('production' == app.get('env')) {
  var oneYear = 31557600000;

  app.use(stylus.middleware({ src: path.join(__dirname, 'public'), compress: true }));
  app.use(express.static(path.join(__dirname, '/public'), { maxAge: oneYear }));
  app.use(errorHandler());
}

app.get('/',
  pugstore.find(1),
  view.photo);

app.get('/:server/:size/:key.:format',
  pugstore.findByName('server', 'key', 'size', 'format'),
  view.photo);

app.listen(port);

console.log("Listening on port " + port);