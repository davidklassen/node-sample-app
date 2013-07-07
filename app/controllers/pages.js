exports.home = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/feed');
  }

  res.render('pages/home');
}
