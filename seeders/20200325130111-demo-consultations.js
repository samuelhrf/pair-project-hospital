
'use strict';

const tableName = 'consultations';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        patient_id: 1,
        doctor_id: 1,
        diagnosis: 'Corona',
        checked_out: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        patient_id: 2,
        doctor_id: 2,
        diagnosis: 'Kemageran',
        checked_out: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null, {});
  }
};