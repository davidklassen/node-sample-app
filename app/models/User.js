var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var utils = require(__dirname + '/../utils');
var Micropost = require(__dirname + '/Micropost');

var UserSchema = mongoose.Schema({
  facebookId: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true },
  email: { type: mongoose.SchemaTypes.Email, index: { unique: true } },
  microposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Micropost' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

UserSchema.plugin(timestamps);

UserSchema.methods.createMicropost = function (text, fn) {
  var self = this;

  Micropost.create({ text: text, user: this._id }, function (err, micropost) {
    if (err) return fn(err);

    self.microposts.push(micropost);
    self.save(function (err) {
      if (err) return fn(err);

      fn(null, micropost);
    });
  });
}

UserSchema.methods.deleteMicropost = function (id, fn) {
  var self = this;

  Micropost.findByIdAndRemove(id, function (err, micropost) {
    if (err) return fn(err);

    self.microposts.remove(id);
    self.save(function (err, user) {
      if (err) return fn(err);

      fn(null, user);
    });
  });
}

UserSchema.methods.follow = function (id, fn) {
  var self = this;

  if (this.hasFollowing(id)) {
    return fn(null, this);
  }

  this.model('User').findById(id, function (err, user) {
    if (err) return fn(err);

    user.followers.push(self._id);
    user.save(function (err) {
      if (err) return fn(err);

      self.following.push(id);
      self.save(function (err, user) {
        if (err) return fn(err);

        fn(null, user);
      });
    });
  });
}

UserSchema.methods.unfollow = function (id, fn) {
  var self = this;

  if (!this.hasFollowing(id)) {
    return fn(null, this);
  }

  this.model('User').findById(id, function (err, user) {
    if (err) return fn(err);

    user.followers.remove(self._id);
    user.save(function (err) {
      if (err) return fn(err);

      self.following.remove(id);
      self.save(function (err, user) {
        if (err) return fn(err);

        fn(null, user);
      });
    });
  });
}

UserSchema.methods.hasFollower = function (user) {
  var id = utils.isObjectId(user) ? user : user._id;

  return this.followers.filter(function (user) {
    var followerId = utils.isObjectId(user) ? user : user._id;

    return followerId.toString() === id.toString();
  }).length;
}

UserSchema.methods.hasFollowing = function (user) {
  var id = utils.isObjectId(user) ? user : user._id;

  return this.following.filter(function (user) {
    var followingId = utils.isObjectId(user) ? user : user._id;

    return followingId.toString() === id.toString();
  }).length;
}

UserSchema.methods.isCurrentUser = function (user) {
  var id = utils.isObjectId(user) ? user : user._id;

  return this._id.toString() === id.toString();
}

module.exports = mongoose.model('User', UserSchema);
