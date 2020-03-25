'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consultation = sequelize.define('Consultation', {
    PatientId: DataTypes.INTEGER,
    diagnosis: DataTypes.STRING,
    checkout: DataTypes.BOOLEAN
  }, {});
  Consultation.associate = function (models) {
    Consultation.belongsTo(models.Patient);
    Consultation.belongsToMany(models.Doctor, { through: models.DocterConsultation });
  };
  return Consultation;
};