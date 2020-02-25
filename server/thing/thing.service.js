const DbService = require('../helpers/baseDbService');
const models = require('../db/models');

// const { Thing } = models;

/**
 * Creates a new ThingService.
 * @extends DbService
 */
class ThingService extends DbService {
  constructor(componentName, models) {
    super(componentName, models);
  }
}

module.exports = new ThingService('Thing', models);
