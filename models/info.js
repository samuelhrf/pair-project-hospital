'use strict';
module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define('Info', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    gender: DataTypes.STRING
  }, {});
  Info.associate = function (models) {
    Info.hasOne(models.Doctor)
    Info.hasOne(models.Patient)
  };
  return Info;
};