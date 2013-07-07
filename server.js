var config = require(__dirname + '/app/config');
var app = require(__dirname + '/app');

app.listen(config.http.port, function () {
  console.log('Listening on port ' + config.http.port);
});
