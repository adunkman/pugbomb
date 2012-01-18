var stylus = require('stylus'),
    express = require('express'),
    path = require('path'),
    pugstore = require('./store/pug'),
    view = require('./view')
    app = express.createServer(),
    port = process.env.PORT || 3000;

app.configure(function () {
  app.set('view engine', 'jade');
});

app.configure('development', function () {
  app.use(stylus.middleware({ src: path.join(__dirname, 'public') }));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
  var oneYear = 31557600000;

  app.use(stylus.middleware({ src: path.join(__dirname, 'public'), compress: true }));
  app.use(express.static(path.join(__dirname, '/public'), { maxAge: oneYear }));
  app.use(express.errorHandler());
});

app.get('/', pugstore.find(1), view.photo);
app.get('/:server/:key', pugstore.findByName('server', 'key'), view.photo);

app.listen(port);

console.log("Listening on port " + port);