const { Model, DataTypes } = require("sequelize");

class UsuarioModel extends Model {
  static init(database) {
    super.init({
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      cpf: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      cargo: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      especialidade: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      tableName: 'usuarios',
      modelName: 'usuario',
      timestamps: false,
      sequelize: database
    });
  }
}

module.exports = { UsuarioModel };