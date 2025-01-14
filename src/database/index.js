import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/Aluno';
import User from '../models/User';
import Foto from '../models/Foto';

const models = [Aluno, User, Foto];

const connection = new Sequelize(databaseConfig);

connection.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi bem-sucedida!');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
        console.log('DATABASE_URL:', process.env.DATABASE_URL);
        console.log('DATABASE_KEY:', process.env.DATABASE_KEY ? '[PRESENTE]' : '[NÃO DEFINIDO]');
    });


models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

export default connection;
