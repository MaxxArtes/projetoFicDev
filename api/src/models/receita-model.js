const { Model, DataTypes } = require("sequelize");

class ReceitaModel extends Model {
    static init(database) {
        super.init({
            id: DataTypes.INTEGER,
            name: DataTypes.TEXT,
            data: DataTypes.DATE,
            horario: DataTypes.TIME,
            unidade_saude: DataTypes.TEXT,
            descricao: DataTypes.TEXT
        }, {
            tableName: 'receitas', 
            modelName: 'receita',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { ReceitaModel };