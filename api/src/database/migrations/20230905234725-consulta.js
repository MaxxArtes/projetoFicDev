'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('consultas', {
      id_consulta: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      historico_clinico: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      receita: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('consultas');
  }
};
