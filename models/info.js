'use strict';
module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define('Info', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  Info.associate = function (models) {
    Info.hasOne(models.Doctor)
    Info.hasOne(models.Patient)
  };
  return Info;
};