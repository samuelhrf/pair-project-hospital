'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    InfoId: DataTypes.INTEGER
  }, {});
  Patient.associate = function (models) {
    Patient.belongsTo(models.Info);
  };
  return Patient;
};