'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thing = sequelize.define('Thing', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Thing.associate = function(models) {
    // associations can be defined here
  };
  return Thing;
};
