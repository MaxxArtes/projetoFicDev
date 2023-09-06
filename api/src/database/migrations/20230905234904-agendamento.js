'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('agendamentos', {
      id: {type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {type: Sequelize.TEXT,
        allowNull: false
      },    
      email: {type: Sequelize.TEXT,
        allowNull: false
      },    
      tel: {type: Sequelize.TEXT,
        allowNull: false
      },
      cel: {type: Sequelize.TEXT,
        allowNull: false
      },
      CNS: {type: Sequelize.INTEGER,
        allowNull: false
      },
      CPF: {type: Sequelize.TEXT,
        allowNull: false
      },
      endereco: {type: Sequelize.TEXT,
        allowNull: false
      },
      nome_medico: {type: Sequelize.TEXT,
        allowNull: false
      },
      especialidade: {type: Sequelize.TEXT,
        allowNull: false
      },
      data: {type: Sequelize.DATE,
        allowNull: false
      },
      horario: {type: Sequelize.TIME,
        allowNull: false
      },  
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('agendamentos');
  }
};
