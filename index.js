var stylus = require('stylus'),
    express = require('express'),
    path = require('path'),
    pugstore = require('./store/pug'),
    view = require('./view')
    app = express.createServer(),
    port = process.env.PORT || 3000;

app.configure(function () {
  app.set('view engine', 'jade');
  app.use(stylus.middleware({ src: path.join(__dirname, 'public') }));
  app.use(express.static(path.join(__dirname, '/public')));
});

app.get('/', pugstore.find(1), view.photo);
app.get('/:server/:key', pugstore.findByName('server', 'key'), view.photo);

app.listen(port);

console.log("Listening on port " + port);