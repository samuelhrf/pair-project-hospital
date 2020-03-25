'use strict';
module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define('Doctor', {
    WardId: DataTypes.INTEGER,
    InfoId: DataTypes.INTEGER,
    consultationPrice: DataTypes.INTEGER
  }, {});
  Doctor.associate = function (models) {
    Doctor.belongsTo(models.Ward);
    Doctor.belongsToMany(models.Consultation, { through: models.DocterConsultation });
    Doctor.belongsTo(models.Info);
  };
  return Doctor;
};