const { Model, DataTypes } = require("sequelize");

class UsuarioModel extends Model {
    static init(database) {
        super.init({
            id: DataTypes.INTEGER,
            name: DataTypes.TEXT,
            password: DataTypes.TEXT,
            cpf: DataTypes.INTEGER,
            cargo: DataTypes.TEXT,
            especialidade: DataTypes.TEXT,
            email: DataTypes.TEXT
        }, {
            tableName: 'usuarios',
            modelName: 'usuario',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { UsuarioModel };