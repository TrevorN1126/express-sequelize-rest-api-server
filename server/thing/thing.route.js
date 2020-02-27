/**
* Routes for the /api/things endpoints
* @module Thing Routes
*/
/**
 * Thing model
 * @typedef {Object} Thing
 * @property {string} name - The name of the thing.
 * @property {string} description - The description of the thing.
 * @property {integer} UserId - The PK of the user this thing belongs to.
 */

const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const ThingController = require('./thing.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router();

router.route('/')

  /**
  * Get a list of things
  *
  * @name Thing List
  * @path {GET} /api/things
  * @code {200} If the request is successful.
  * @response {Thing[]} Things An array of things
  */
  .get(ThingController.list)

  /**
  * Creates a new Thing
  *
  * @name Create Thing
  * @path {POST} /api/things
  * @auth This route requires a valid token with 'User' or 'Admin' permissions.
  * If authentication fails it will return a 401 error.
  * @body {Object} req.body
  * @body {String} req.body.name The name of the thing.
  * @body {String} [req.body.description] The description of the thing.
  * @body {Integer} req.body.UserId The PK of the user that this thing belongs to.
  * @code {200} If the request is successful.
  * @response {object} Thing
  * @code {400} If body is not sent right.
  * @response {APIError} error
  * @response {APIError} error.message
  * @response {APIError} error.httpStatus
  */
  .post(protectRoute([['User'], ['Admin']]), validate(paramValidation.createThing), ThingController.create);

router.route('/:thingId')
  /**
  * Get a thing by id
  *
  * @name Get Thing
  * @path {GET} /api/things/:thingId
  * @params {String} :thingId The unique identifier for the thing to get.
  * @code {200} If the request is successful.
  * @response {Object} Thing
  * @code {404} If the thing is not found.
  * @response {APIError} error
  * @response {APIError} error.message User not found.
  * @response {APIError} error.httpStatus NOT_FOUND
  */
  .get(ThingController.get)

  /**
  * Update a thing by id
  *
  * @name Update Thing
  * @path {PUT} /api/things/:thingId
  * @params {String} :thingId The unique identifier for the thing to update.
  * @auth This route requires a token with Admin permission.
  * If authentication fails it will return a 401 error.
  * @code {200} If the request is successful.
  * @response {Object} Thing
  * @code {404} If the thing is not found.
  * @response {APIError} error
  * @response {APIError} error.message User not found.
  * @response {APIError} error.httpStatus NOT_FOUND
  */
  .put(protectRoute(['Admin']), ThingController.update)

  /**
  * Delete a thing by id
  *
  * @name Delete Thing
  * @path {DELETE} /api/things/:thingId
  * @params {String} :thingId  The unique identifier for the thing to delete.
  * @auth This route requires a token with Admin permission.
  * If authentication fails it will return a 401 error.
  * @code {200} If the request is successful.
  * @response {Object} Thing
  * @code {404} If the thing is not found.
  * @response {APIError} error
  * @response {APIError} error.message User not found.
  * @response {APIError} error.httpStatus NOT_FOUND
  */
  .delete(protectRoute(['Admin']), ThingController.remove);

module.exports = router;
