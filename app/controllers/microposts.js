var Micropost = require(__dirname + '/../models/Micropost');

exports.index = function (req, res, next) {
  var ids = req.user.following.map(function (user) { return user._id });
  ids.push(req.user._id);

  Micropost.where('user').in(ids).sort({ _id: -1 }).populate('user').exec(function (err, microposts) {
    if (err) return next(err);

    res.render('microposts/index', { microposts: microposts });
  });
}

exports.create = function (req, res, next) {
  var back = req.header('Referer') || '/feed';

  req.user.createMicropost(req.body.text, function (err) {
    if (err) return next(err);

    res.redirect(back);
  });
}

exports.remove = function (req, res, next) {
  var back = req.header('Referer') || '/feed';

  req.user.deleteMicropost(req.params.id, function (err) {
    if (err) return next(err);

    res.redirect(back);
  });
}
