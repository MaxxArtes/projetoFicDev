const { Model, DataTypes } = require("sequelize");

class AgendamentoModel extends Model {
    static init(database) {
        super.init({
            id: DataTypes.INTEGER,
            name: DataTypes.TEXT,
            email: DataTypes.TEXT,
            tel: DataTypes.INTEGER,
            cel: DataTypes.INTEGER,
            CNS: DataTypes.INTEGER,
            CPF: DataTypes.INTEGER,
            endereco: DataTypes.TEXT,
            nome_medico: DataTypes.TEXT,
            especialidade: DataTypes.TEXT,
            data: DataTypes.DATE,
            horario: DataTypes.TIME,
        }, {
            tableName: 'agendamentos', 
            modelName: 'agendamento',
            timestamps: false,
            sequelize: database
        });
    }
}

module.exports = { AgendamentoModel };  