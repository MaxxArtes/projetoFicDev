const { Model, DataTypes } = require("sequelize");

class ReceitaModel extends Model {
    static init(database) {
        super.init({
            id: {type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {type: DataTypes.INTEGER,
                allowNull: false
            },
            data: {type: DataTypes.INTEGER,
                allowNull: false
            },
            horario: {type: DataTypes.INTEGER,
                allowNull: false
            },
            unidade_saude: {type: DataTypes.INTEGER,
                allowNull: false
            },
            descricao: {type: DataTypes.INTEGER,
                allowNull: false
            },
        }, {
            tableName: 'receitas', 
            modelName: 'receita',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { ReceitaModel };