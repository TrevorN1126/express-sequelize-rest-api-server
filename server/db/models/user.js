'use strict';
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const hashPasswordHook = async (user, options) => {
  if (!user.changed('password')) return;
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  user.password = await bcrypt.hash(user.password, salt);
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Permission);
    models.User.hasMany(models.Thing);
  };
  User.beforeCreate( hashPasswordHook );
  User.beforeUpdate( hashPasswordHook );
  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }
  return User;
};
