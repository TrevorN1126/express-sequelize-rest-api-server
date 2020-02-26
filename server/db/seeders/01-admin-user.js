/* eslint-disable */
const { User } = require('../models');

const users = [{
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  username: 'TestAdmin',
  password: 'password',
  createdAt: new Date(),
  updatedAt: new Date()
}];

module.exports = {
  up: (queryInterface, Sequelize) => User.bulkCreate(users,
    {
      validate: true,
      individualHooks: true
    }),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
