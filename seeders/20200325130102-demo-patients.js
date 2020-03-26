
'use strict';

const tableName = 'patients';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        info_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        info_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null, {});
  }
};