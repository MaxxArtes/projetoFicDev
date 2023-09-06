'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('consulta', {
      id: Sequelize.INTEGER,
      name: Sequelize.TEXT,
      sexo: Sequelize.TEXT,
      data_nasc: Sequelize.DATE,
      endereco: Sequelize.TEXT,
      historico_clinico: Sequelize.TEXT,
      descricao: Sequelize.TEXT
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('consulta');
  }
};
