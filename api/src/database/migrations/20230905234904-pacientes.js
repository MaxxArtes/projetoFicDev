'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('pacientes', {
      id_paciente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      tel: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cel: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      CNS: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      CPF: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      sexo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      data_nasc: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endereco: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('pacientes');
  }
};
