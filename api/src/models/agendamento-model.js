const { Model, DataTypes } = require("sequelize");

class AgendamentoModel extends Model {
  static init(database) {
    super.init({
      id_agendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome_medico: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      especialidade: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      data: {
        type: DataTypes.DATE,
        allowNull: false
      },
      horario: {
        type: DataTypes.TIME,
        allowNull: false
      },
      unidade_saude: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    }, {
      tableName: 'agendamentos',
      modelName: 'agendamento',
      timestamps: false,
      sequelize: database
    });
  }
  static associate(models) {
    this.belongsTo(models.PacienteModel, { foreignKey: 'id_paciente' });
  }

}

module.exports = { AgendamentoModel };  