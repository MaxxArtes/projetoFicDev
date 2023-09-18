'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('usuarios', {
      id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cpf: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cargo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      especialidade: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      }
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('usuarios');
  }
};
