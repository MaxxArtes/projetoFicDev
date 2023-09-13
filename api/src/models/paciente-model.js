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
<<<<<<< HEAD
        this.hasMany(models.AgendamentoModel, { foreignKey: 'id_paciente' });
        this.hasMany(models.ConsultaModel, { foreignKey: 'id_paciente' });
      }
=======
        this.hasMany(models.AgendamentoModel, { foreignKey: "id_paciente" });
        this.hasMany(models.ConsultaModel, { foreignKey: "id_paciente" });
    }
>>>>>>> e43bf017635aa5a69b6d1d81fa31535be163f35f
}

module.exports = { PacienteModel };