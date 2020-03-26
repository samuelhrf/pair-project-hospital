'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    ward_id: DataTypes.INTEGER,
    info_id: DataTypes.INTEGER,
    consultation_price: DataTypes.INTEGER
  }, {});
  Doctor.associate = function (models) {
    Doctor.belongsTo(models.Ward);
    Doctor.belongsToMany(models.Patient, { through: models.Consultation });
    Doctor.hasMany(models.Consultation);
    Doctor.belongsTo(models.Info);
  };
  return Doctor;
};