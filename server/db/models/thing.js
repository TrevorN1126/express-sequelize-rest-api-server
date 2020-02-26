
module.exports = (sequelize, DataTypes) => {
  const Thing = sequelize.define('Thing', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING
  }, {});
  Thing.associate = function associate(models) {
    models.Thing.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Thing;
};
