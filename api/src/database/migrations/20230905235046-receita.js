'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('receitas', {
      id: {type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      name: {type: Sequelize.INTEGER,
        allowNull: false
      },
      data: {type: Sequelize.INTEGER,
        allowNull: false
      },
      horario: {type: Sequelize.INTEGER,
        allowNull: false
      },
      unidade_saude: {type: Sequelize.INTEGER,
        allowNull: false
      },
      descricao: {type: Sequelize.INTEGER,
        allowNull: false
      },
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('receitas');
  }
};
