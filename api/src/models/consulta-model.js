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
      paciente: {
        type: DataTypes.BOOLEAN,
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
<<<<<<< HEAD
    ConsultaModel.belongsTo(models.PacienteModel, { foreignKey: 'id_paciente' });
=======
    this.belongsTo(models.ConsultaModel, { foreignKey: "id_consulta" });
>>>>>>> e43bf017635aa5a69b6d1d81fa31535be163f35f
  }
}

module.exports = { ConsultaModel };