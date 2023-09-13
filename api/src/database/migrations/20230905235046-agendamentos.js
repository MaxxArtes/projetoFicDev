'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('agendamentos', {
<<<<<<< HEAD
      id_agendamento: {type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
=======
      id_agendamento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
>>>>>>> e43bf017635aa5a69b6d1d81fa31535be163f35f
      },
      nome_medico: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      especializacao: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      data: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      horario: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      unidade_saude: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('agendamentos');
  }
};
