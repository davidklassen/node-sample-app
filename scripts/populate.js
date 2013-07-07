var config = require(__dirname + '/../app/config');
var mongoose = require('mongoose');
require('mongoose-types').loadTypes(mongoose);
mongoose.connect('mongodb://' + config.mongo.host + '/' + config.mongo.name);
var Factory = require('factory-lady');
var Faker = require('Faker');
var User = require(__dirname + '/../app/models/User');

var counter = 1;

Factory.define('user', User, {
  facebookId: function (fn) { fn(Faker.random.number(1000)); },
  name: function (fn) { fn(Faker.Name.findName()); },
  email: function (fn) { fn(Faker.Internet.email()); }
});

for (var i = 0; i < 10; i++) {
  Factory.build('user', function (user) {
    user.save(function (err, user) {
      for (var j = 0; j < 5; j++) {
        user.createMicropost(Faker.Lorem.sentence(), function (err, res) {});
      }
    });
  });
}
