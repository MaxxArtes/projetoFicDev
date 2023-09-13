const { Model, DataTypes } = require("sequelize");

class PacienteModel extends Model {
    static init(database) {
        super.init({
            id_paciente: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            tel: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            cel: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            CNS: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            CPF: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            sexo: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            data_nasc: {
                type: DataTypes.DATE,
                allowNull: false
            },
            endereco: {
                type: DataTypes.TEXT,
                allowNull: false
            },
        }, {
            tableName: 'pacientes',
            modelName: 'paciente',
            timestamps: false,
            sequelize: database
        });
    }
    static associate(models) {
        this.hasMany(models.AgendamentoModel, { foreignKey: 'id_paciente' });
        this.hasMany(models.ConsultaModel, { foreignKey: 'id_paciente' });
      }
}

module.exports = { PacienteModel };