'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('receita', {
      id: Sequelize.INTEGER,
      name: Sequelize.TEXT,
      data: Sequelize.DATE,
      horario: Sequelize.TIME,
      unidade_saude: Sequelize.TEXT,
      descricao: Sequelize.TEXT
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('receita');
  }
};
