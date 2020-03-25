'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ward = sequelize.define('Ward', {
    name: DataTypes.STRING
  }, {});
  Ward.associate = function (models) {
    Ward.hasMany(models.Doctor)
  };
  return Ward;
};