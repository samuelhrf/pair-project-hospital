
'use strict';

const tableName = 'infos';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'example@example.com',
        phone_number: '0254154668',
        address: 'ahjsgdjyw',
        date_of_birth: new Date(),
        gender: 'male',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'Johna',
        last_name: 'Doea',
        email: 'example@example.coma',
        phone_number: '0254154668a',
        address: 'ahjsgdjywa',
        date_of_birth: new Date(),
        gender: 'malea',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'Johns',
        last_name: 'Does',
        email: 'example@example.coms',
        phone_number: '0254154668s',
        address: 'ahjsgdjyw',
        date_of_birth: new Date(),
        gender: 'male',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'Johnav',
        last_name: 'Doeav',
        email: 'example@example.coma',
        phone_number: '0254154668a',
        address: 'ahjsgdjywa',
        date_of_birth: new Date(),
        gender: 'malea',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'Johnav',
        last_name: 'Doeav',
        email: 'example@example.coma',
        phone_number: '0254154668a',
        address: 'ahjsgdjywa',
        date_of_birth: new Date(),
        gender: 'malea',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null, {});
  }
};