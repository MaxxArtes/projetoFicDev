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
        allowNull: false
      }
    }, {
      tableName: 'consultas',
      modelName: 'consulta',
      timestamps: false,
      sequelize: database
    });
  }
}

module.exports = { ConsultaModel };