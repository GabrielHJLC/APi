import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'nome deve ter pelo menos 3 caracteres',
                    },
                },
            },
            sobrenome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'nome deve ter pelo menos 3 caracteres',
                    },
                },
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: ['Esse E-mail já está sendo usado'],
                },
                validate: {
                    isEmail: {
                        msg: 'Email Inválido',
                    },
                },
            },
            idade: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    isInt: {
                        msg: 'Idade deve ser um número',
                    },
                },
            },
        }, {
            sequelize,
        });
        return this;
    }

    static associate(models) {
        this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
    }
}
