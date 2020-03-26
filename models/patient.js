'use strict';
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    info_id: DataTypes.INTEGER
  }, {});
  Patient.associate = function (models) {
    Patient.belongsTo(models.Info);
    Patient.belongsToMany(models.Doctor, { through: models.Consultation });
    Patient.hasMany(models.Consultation);
  };
  return Patient;
};