/**
* Routes for the /api/things endpoints
* @module Thing Routes
*/

const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const ThingController = require('./thing.controller');
const protectRoute = require('../middleware/protectRoute');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /**
  * Get a list of things
  *
  * @name Thing List
  * @path {GET} /api/things
  * @auth This route requires a token with Admin permission.
  * If authentication fails it will return a 401 error.
  */
  .get(ThingController.list)

  /** POST /api/things - Create new thing */
  .post(protectRoute([['User'], ['Admin']]), validate(paramValidation.createThing), ThingController.create);

router.route('/:thingId')
  /** GET /api/things/:thingId - Get thing */
  .get(ThingController.get)

  /** PUT /api/things/:thingId - Update thing */
  .put(protectRoute(['Admin']), ThingController.update)

  /** DELETE /api/things/:thingId - Delete thing */
  .delete(protectRoute(['Admin']), ThingController.remove);

module.exports = router;
