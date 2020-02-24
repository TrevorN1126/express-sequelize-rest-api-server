'use strict';

const User = require('../models').User;

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = await User.findAll({});

    return await queryInterface.bulkInsert('Things', [{
            id: 1,
            name: 'The Thing',
            description: 'Description of the thing',
            createdAt: new Date(),
            updatedAt: new Date(),
            Userid: users[0].id
        }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Things', null, {});
  }
};
