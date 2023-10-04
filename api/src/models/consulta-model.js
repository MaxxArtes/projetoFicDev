const { Model, DataTypes } = require("sequelize");

class ConsultaModel extends Model {
  static init(database) {
    super.init({
      id_consulta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      historico_clinico: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      receita: {
        type: DataTypes.BOOLEAN,
      },
      id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'consultas',
      modelName: 'consulta',
      timestamps: false,
      sequelize: database
    });
  }
  static associate(models) {
    ConsultaModel.belongsTo(models.PacienteModel, { foreignKey: 'id_paciente' });
  }
}

module.exports = { ConsultaModel };