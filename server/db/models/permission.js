'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Permission.associate = function (models) {
    models.Permission.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Permission;
};
