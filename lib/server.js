'use strict';

var app = require('./app'),
    models = require('../models');

app.set('port', process.env.PORT || 8000);

models.sequelize.sync({force: true}).then(function() {
  app.listen(app.get('port'), function() {
    console.log("Server listening on port 8000!")
  });
})
