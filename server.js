var config = require(__dirname + '/app/config');
var app = require(__dirname + '/app');

var port = process.env.PORT || config.http.port;

app.listen(port, function () {
  console.log('Listening on port ' + port);
});
