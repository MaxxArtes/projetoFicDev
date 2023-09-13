'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('agendamentos', 'id_paciente', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'pacientes',
        key: 'id_paciente'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('agendamentos', 'id_paciente');
  }
};