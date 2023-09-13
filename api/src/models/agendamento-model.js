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
        type: DataTypes.INTEGER,
        allowNull: false
      },
      especializacao: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      data: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      horario: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      unidade_saude: {
        type: DataTypes.INTEGER,
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
<<<<<<< HEAD
    this.belongsTo(models.PacienteModel, { foreignKey: 'id_paciente' });
  }
  
=======
    this.belongsTo(models.AgendamentoModel, { foreignKey: "id_agendamento" });
  }

>>>>>>> e43bf017635aa5a69b6d1d81fa31535be163f35f
}

module.exports = { AgendamentoModel };  