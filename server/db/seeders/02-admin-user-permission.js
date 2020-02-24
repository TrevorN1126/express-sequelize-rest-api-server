'use strict';

const User = require('../models').User;

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await User.findAll({});

    return await queryInterface.bulkInsert('Permissions', [{
            id: 1,
            role: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date(),
            Userid: users[0].id
        }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Permissions', null, {});
  }
};
