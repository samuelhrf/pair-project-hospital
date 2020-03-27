'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('consultations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patient_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      doctor_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      diagnosis: {
        type: Sequelize.STRING
      },
      checked_out: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      canceled: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('consultations');
  }
};