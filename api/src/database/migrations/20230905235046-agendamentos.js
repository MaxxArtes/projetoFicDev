'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('agendamentos', {
      id_agendamento: {type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      nome_medico: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      especialidade: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      horario: {
        type: Sequelize.TIME,
        allowNull: false
      },
      unidade_saude: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('agendamentos');
  }
};
