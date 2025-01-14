const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('users', [
            {
                nome: 'Gabriel',
                email: 'testegabriel483@gmail.com',
                password_hash: await bcrypt.hash('123456', 8),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                nome: 'Gabriel2',
                email: 'testegabriel484@gmail.com',
                password_hash: await bcrypt.hash('123456', 8),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                nome: 'Gabriel3',
                email: 'testegabriel485@gmail.com',
                password_hash: await bcrypt.hash('123456', 8),
                created_at: new Date(),
                updated_at: new Date(),
            },
        ], {});
    },

    async down() {},
};
