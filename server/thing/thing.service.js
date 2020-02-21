const DbService = require('../helpers/baseDbService');
const Thing = require('../db/models');

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
