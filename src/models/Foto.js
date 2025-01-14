import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Foto extends Model {
    static init(sequelize) {
        super.init({
            originalname: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'OriginalName não pode ficar vazio.',
                    },
                },
            },
            filename: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'FileName não pode ficar vazio.',
                    },
                },
            },
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/images/${this.getDataValue('filename')}`;
                },
            },
        }, {
            sequelize,
            tableName: 'fotos',
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
    }
}
