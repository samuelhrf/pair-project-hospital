'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consultation = sequelize.define('Consultation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    patient_id: DataTypes.INTEGER,
    doctor_id: DataTypes.INTEGER,
    diagnosis: DataTypes.STRING,
    checked_out: DataTypes.BOOLEAN
  }, {});
  Consultation.associate = function (models) {
    Consultation.belongsTo(models.Patient);
    Consultation.belongsTo(models.Doctor);
  };
  return Consultation;
};