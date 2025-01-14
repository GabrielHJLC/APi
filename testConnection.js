require('dotenv').config();
const { Sequelize } = require('sequelize');

const connection = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    family: 4,
  },
});

connection.authenticate()
  .then(() => {
    console.log('Conexão com o banco foi bem-sucedida!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco:', error.message);
  });
