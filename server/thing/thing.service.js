const DbService = require('../helpers/baseDbService');
const ThingModel = require('./thing.model');

/**
 * Creates a new ThingService.
 * @class
 */
class ThingService extends DbService {
  constructor(componentName, model) {
    super(componentName, model);
  }
}

module.exports = new ThingService('Thing', ThingModel);
