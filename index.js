var pugs = require('./pugs'),
    express = require('express'),
    app = express.createServer(),
    port = process.env.PORT || 3000;

app.configure(function () {
  app.set('view engine', 'jade');
});

app.get('/', function (request, response) {
  pugs.get(1, function (error, pug) {
    if (error) next(error);
    response.render('photo', { pug: pug });
  });
});

app.get('/:server/:tumblrId', function (request, response) {
  pugs.get(request.params.server, request.params.tumblrId, function (error, pug) {
    if (error) next(error);
    response.render('photo', { pug: pug });
  });
});

app.listen(port);
console.log("pugbomb.me listening on port " + port);
