'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
      },
      name: {type: Sequelize.TEXT,
        allowNull: false
      },
      password: {type: Sequelize.TEXT,
        allowNull: false
      },
      cpf: {type: Sequelize.TEXT,
        allowNull: false
      },
      cargo: {type: Sequelize.TEXT,
        allowNull: false
      },
      especialidade: {type:Sequelize.TEXT,
        allowNull: false
      },
      email: {type:Sequelize.TEXT,
        allowNull: false
      }
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('usuarios');
  }
};
