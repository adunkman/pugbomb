module.exports = {
  photo: function (request, response) {
    response.render('photo', response.data);
  }
};