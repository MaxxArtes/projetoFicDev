'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('consultas', {
      id: {type:Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
      },
      name: {type:Sequelize.TEXT,
        allowNull: false
      },
      sexo: {type:Sequelize.TEXT,
        allowNull: false
      },
      data_nasc: {type:Sequelize.DATE,
        allowNull: false
      },
      endereco: {type:Sequelize.TEXT,
        allowNull: false
      },
      historico_clinico: {type:Sequelize.TEXT,
        allowNull: false
      },
      descricao: {type:Sequelize.TEXT,
        allowNull: false
      }    
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('consultas');
  }
};
