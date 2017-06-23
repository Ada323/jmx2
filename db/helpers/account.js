var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var Account = require('../schema/account.js');

function comparePassword(candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

function findAll(cb) {
  Account.find({}, cb);
}

function findOne(username, cb) {
  Account.findOne({username: username}, cb);
}

function insertOne(user, cb) {
  bcrypt.hash(user.password, null, null, function(a,b,c) {
    // console.log('a: ', a ,'b: ', b, 'c: ', c); // this just changes the password at insertion
    user.password = b;
    Account.create(user, cb);
  });
};

// takes a username and a movie, user: String, movie: Object
// puts the movie into user.watched
function insertMovieIntoWatched(user, movie) {

  findOne(user, function (err, account) {
    if (err) throw err;
    account.watched.unshift(movie);
    account.save();
    // console.log('adding movie: ', movie)
    // console.log('to Watched for account: ', account);
    // console.log('for user: ', username);
  });
};

function removeMovieFromWatched(user, movie) {
  findOne(user, function (err, account) {
    if (err) throw err;
    var index;
    for (var i = 0; i < account.watched.length; i++) {
      if (account.watched[i].title === movie.title) {
        index = i;
        break;
      }
    }
    if (index !== undefined) {
      account.watched.splice(index, 1);
    }
    account.save();
    // console.log('removing movie: ', movie);
    // console.log('from Watched for account: ', account);
    // console.log('at index: ', index);
    // console.log('for user: ', user);
  });
};

function insertMovieIntoFaves(user, movie) {

  findOne(user, function (err, account) {
    if (err) throw err;
    account.favorites.push(movie);
    account.save();
    // console.log('adding movie: ', movie)
    // console.log('to Favorites for account: ', account);
    // console.log('for user: ', username);
  });
};

function removeMovieFromFaves(user, movie) {
  findOne(user, function (err, account) {
    if (err) throw err;
    var index;
    for (var i = 0; i < account.favorites.length; i++) {
      if (account.favorites[i].title === movie.title) {
        index = i;
        break;
      }
    }
    if (index !== undefined) {
      account.favorites.splice(index, 1);
    }
    account.save();
    // console.log('removing movie: ', movie);
    // console.log('from Watched for account: ', account);
    // console.log('at index: ', index);
    // console.log('for user: ', user);
  });
};

function addCommentToWatchedMovie(user, movie, year, comment) {
  findOne(user, function (err, account) {
    if (err) throw err;
    for (var i = 0; i < account.watched.length; i++) {
      if (account.watched[i].title === movie.title && account.watched[i].year === movie.year) {
        account.watched[i].comment === comment
        break
      }
    }
    account.save()
  })
}

function addRatingToWatchedMovie(user, movie, year, rating) {
  findOne(user, function (err, account) {
    if (err) throw err;
    for (var i = 0; i < account.watched.length; i++) {
      if (account.watched[i].title === movie.title && account.watched[i].year === movie.year) {
        account.watched[i].rating === rating
        break
      }
    }
    account.save()
  })
}

exports.comparePassword = comparePassword;
exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.insertMovieIntoWatched = insertMovieIntoWatched;
exports.removeMovieFromWatched = removeMovieFromWatched;
exports.insertMovieIntoFaves = insertMovieIntoFaves;
exports.removeMovieFromFaves = removeMovieFromFaves;
