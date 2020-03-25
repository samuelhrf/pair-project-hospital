'use strict';
module.exports = (sequelize, DataTypes) => {
  const DoctorConsultation = sequelize.define('DoctorConsultation', {
    DoctorId: DataTypes.INTEGER,
    ConsultationId: DataTypes.INTEGER
  }, {});
  DoctorConsultation.associate = function (models) {
    DoctorConsultation.belongsTo(models.Doctor)
    DoctorConsultation.belongsTo(models.Consultation)
  };
  return DoctorConsultation;
};