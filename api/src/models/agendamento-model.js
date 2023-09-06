const { Model, DataTypes } = require("sequelize");

class AgendamentoModel extends Model {
    static init(database) {
        super.init({
            id: {type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
              },
              name: {type: DataTypes.TEXT,
                allowNull: false
              },    
              email: {type: DataTypes.TEXT,
                allowNull: false
              },    
              tel: {type: DataTypes.TEXT,
                allowNull: false
              },
              cel: {type: DataTypes.TEXT,
                allowNull: false
              },
              CNS: {type: DataTypes.INTEGER,
                allowNull: false
              },
              CPF: {type: DataTypes.TEXT,
                allowNull: false
              },
              endereco: {type: DataTypes.TEXT,
                allowNull: false
              },
              nome_medico: {type: DataTypes.TEXT,
                allowNull: false
              },
              especialidade: {type: DataTypes.TEXT,
                allowNull: false
              },
              data: {type: DataTypes.DATE,
                allowNull: false
              },
              horario: {type: DataTypes.TIME,
                allowNull: false
              },  
        }, {
            tableName: 'agendamentos', 
            modelName: 'agendamento',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { AgendamentoModel };  