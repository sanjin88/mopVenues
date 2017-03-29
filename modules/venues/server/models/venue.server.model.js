'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Venue Schema
 */
var VenueSchema = new Schema({
  id: {
    type: String,  // FourSquareID
    unique: true
  },
  name: {
    type: String,
    default: '',
    trim: true,
  },
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  location: {
    country: {
      type: String
    },
    city: {
      type: String
    },
    address: {
      type: String
    },
    distance: {
      type: Number
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    },
  },
  verified: {
    type: Boolean
  }

});

mongoose.model('Venue', VenueSchema);
