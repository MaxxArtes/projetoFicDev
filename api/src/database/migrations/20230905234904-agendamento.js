'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('agendamento', {
      id: Sequelize.INTEGER,
      name: Sequelize.TEXT,
      email: Sequelize.TEXT,
      tel: Sequelize.INTEGER,
      cel: Sequelize.INTEGER,
      CNS: Sequelize.INTEGER,
      CPF: Sequelize.INTEGER,
      endereco: Sequelize.TEXT,
      nome_medico: Sequelize.TEXT,
      especialidade: Sequelize.TEXT,
      data: Sequelize.DATE,
      horario: Sequelize.TIME,
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('agendamento');
  }
};
