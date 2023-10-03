const { Model, DataTypes } = require("sequelize");
const { PacienteModel } = require("./paciente-model");

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
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
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