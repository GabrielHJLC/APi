require('dotenv').config();

module.exports = {
    dialect: 'postgres', 
    host: process.env.DATABASE_HOST, 
    port: process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    logging: (msg) => console.log(`[Sequelize Log] ${msg}`),
    dialectOptions: {
        timezone: 'America/Fortaleza',
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        family: 4,
    },
    timezone: 'America/Fortaleza',
};
