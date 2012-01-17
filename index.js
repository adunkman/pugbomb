var pugs = require('./pugs'),
    express = require('express'),
    app = express.createServer();

app.configure(function () {
   app.set('view engine', 'jade');
});

app.get('/', function (request, response) {
   pugs.get(1, function (error, pugs) {
      if (error) next(error);

      response.render('index', {
         pugs: pugs
      });
   });
});

app.listen(3000);