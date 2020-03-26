
'use strict';

const tableName = 'doctors';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        ward_id: 1,
        info_id: 1,
        consultation_price: 50000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        ward_id: 1,
        info_id: 3,
        consultation_price: 50000,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        ward_id: 2,
        info_id: 5,
        consultation_price: 50000,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null, {});
  }
};