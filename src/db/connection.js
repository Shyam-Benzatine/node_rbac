const Sequelize = require('sequelize')

const sequelize = new Sequelize('nodejs_rubac', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // Change this to your database dialect
});

module.exports = sequelize;
