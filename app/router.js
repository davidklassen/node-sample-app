// controllers
var pages = require(__dirname + '/controllers/pages');
var users = require(__dirname + '/controllers/users');
var microposts = require(__dirname + '/controllers/microposts');

module.exports = function (app) {
  app.get('/', pages.home);

  app.get('/users', users.index);
  app.get('/users/:id/followers', users.followers);
  app.get('/users/:id/following', users.following);
  app.get('/users/:id', users.show);
  app.post('/users/:id/follow', users.follow);
  app.post('/users/:id/unfollow', users.unfollow);

  app.get('/feed', microposts.index);
  app.post('/microposts', microposts.create);
  app.del('/microposts/:id', microposts.remove);
}

