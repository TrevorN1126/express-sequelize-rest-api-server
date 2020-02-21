'use strict';
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Permission);
  };
  User.beforeCreate( async (user, options) => {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    user.password = await bcrypt.hash(user.password, salt);
  });
  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }
  return User;
};
