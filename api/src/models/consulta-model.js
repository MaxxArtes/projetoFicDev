const { Model, DataTypes } = require("sequelize");

class ConsultaModel extends Model {
    static init(database) {
        super.init({
            id: DataTypes.INTEGER,
            name: DataTypes.TEXT,
            sexo: DataTypes.TEXT,
            data_nasc: DataTypes.DATE,
            endereco: DataTypes.TEXT,
            historico_clinico: DataTypes.TEXT,
            descricao: DataTypes.TEXT
        }, {
            tableName: 'receitas', 
            modelName: 'receita',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { ConsultaModel };