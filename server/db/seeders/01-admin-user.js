'use strict';

const User = require('../models').User;

let users = [{
  firstName: 'John',
  lastName: 'Doe',
  username: 'TestAdmin',
  password: 'password',
  createdAt: new Date(),
  updatedAt: new Date()
}];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return User.bulkCreate( users,
      {
        validate: true,
        individualHooks: true
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
