const { Model, DataTypes } = require("sequelize");

class ConsultaModel extends Model {
    static init(database) {
        super.init({
            id: {type:DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
                },
                name: {type:DataTypes.TEXT,
                  allowNull: false
                },
                sexo: {type:DataTypes.TEXT,
                  allowNull: false
                },
                data_nasc: {type:DataTypes.DATE,
                  allowNull: false
                },
                endereco: {type:DataTypes.TEXT,
                  allowNull: false
                },
                historico_clinico: {type:DataTypes.TEXT,
                  allowNull: false
                },
                descricao: {type:DataTypes.TEXT,
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