'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Venue = mongoose.model('Venue'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create or update an venue
 */
exports.createOrUpdate = function (req, res) {
  Venue.findOne({ id: req.body.id }).populate('users').exec(function (err, existingVenue) {
    var tagged;
    if (err) {
      return res.status(404).send({
        message: 'No venue with that identifier has been found'
      });
    } else if (!existingVenue) {
      createNewVenue(req, res)
    } else {
      updateVenue(req, res, existingVenue);
    }
  });
};

// Save new venue with user
function createNewVenue(req, res) {
  var venue = new Venue(req.body);
  var tagged;
  venue.users = [];
  venue.users.push(req.user);
  venue.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      tagged = true;
      res.json({ venue: venue, tagged: tagged });
    }
  });
}

// Ad or remove user from existingVenue reference list
function updateVenue(req, res, existingVenue) {
  var tagged;
  var userIndex = getIndexOfUserFromList(existingVenue.users, req.user._id, '_id');
  if (userIndex > -1) {
    existingVenue.users.splice(userIndex);
    tagged = false;
  } else {
    existingVenue.users.push(req.user);
    tagged = true;
  }
  existingVenue.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json({ venue: existingVenue, tagged: tagged });
    }
  });
}

/**
 * Show the current venue
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var venue = req.venue ? req.venue.toJSON() : {};

  // Add a custom field to the Venue, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Venue model.
  venue.isCurrentUserOwner = !!(req.user && venue.user && venue.user._id.toString() === req.user._id.toString());

  res.json(venue);
};

/**
 * Update an venue
 */
exports.update = function (req, res) {
  var venue = req.venue;

  venue.title = req.body.title;
  venue.content = req.body.content;

  venue.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(venue);
    }
  });
};

/**
 * Delete an venue
 */
exports.delete = function (req, res) {
  var venue = req.venue;

  venue.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(venue);
    }
  });
};

/**
 * List of Venues
 */
exports.list = function (req, res) {
  Venue.find().sort('-created').populate('user', 'displayName').exec(function (err, venues) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(venues);
    }
  });
};

/**
 * List of user Venues
 */
exports.userList = function (req, res) {
  Venue.find().populate('users').find({ 'users' : req.user._id }).sort('-created').populate('users').exec(function (err, venues) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(venues);
    }
  });
};

/**
 * Venue middleware
 */
exports.venueByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Venue is invalid'
    });
  }

  Venue.findById(id).populate('user', 'displayName').exec(function (err, venue) {
    if (err) {
      return next(err);
    } else if (!venue) {
      return res.status(404).send({
        message: 'No venue with that identifier has been found'
      });
    }
    req.venue = venue;
    next();
  });
};

/**
 * Helpers
 */

function getIndexOfUserFromList(users, value, property) {
  for (var i = 0; i < users.length; i++) {
    if (users[i][property].toString() === value.toString()) {
      return i;
    }
  }
  return -1;
}
