const DbService = require('../helpers/baseDbService');
const models = require('../db/models');
const Thing = models.Thing;

/**
 * Creates a new ThingService.
 * @class
 */
class ThingService extends DbService {
  constructor(componentName, model) {
    super(componentName, model);
  }
}

module.exports = new ThingService('Thing', Thing);
