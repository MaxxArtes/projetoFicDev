'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('usuarios', {
      id: Sequelize.INTEGER,
      name: Sequelize.TEXT,
      password: Sequelize.TEXT,
      cpf: Sequelize.INTEGER,
      cargo: Sequelize.TEXT,
      especialidade: Sequelize.TEXT,
      email: Sequelize.TEXT
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('usuarios');
  }
};
