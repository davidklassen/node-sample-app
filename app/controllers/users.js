var User = require(__dirname + '/../models/User');

exports.index = function (req, res, next) {
  User.find().sort({ _id: -1 }).exec(function (err, users) {
    if (err) return next(err);

    res.render('users/index', { users: users });
  });
}

exports.show = function (req, res, next) {
  User.findById(req.params.id).populate('followers following microposts').exec(function (err, user) {
    if (err) return next(err);

    res.render('users/show', { user: user });
  });
}

exports.follow = function (req, res, next) {
  var back = req.header('Referer') || '/feed';

  req.user.follow(req.params.id, function (err) {
    if (err) return next(err);

    res.redirect(back);
  });
}

exports.unfollow = function (req, res, next) {
  var back = req.header('Referer') || '/feed';

  req.user.unfollow(req.params.id, function (err) {
    if (err) return next(err);

    res.redirect(back);
  });
}

exports.followers = function (req, res, next) {
  User.findById(req.params.id).populate('followers').exec(function (err, user) {
    if (err) return next(err);

    res.render('users/followers', { user: user });
  });
}

exports.following = function (req, res, next) {
  User.findById(req.params.id).populate('following').exec(function (err, user) {
    if (err) return next(err);

    res.render('users/following', { user: user });
  });
}
