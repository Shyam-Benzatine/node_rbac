const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const User = sequelize.define('user', {
    // Define your model attributes

    role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique:true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    state: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    country: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: true
    },
}, {
    timestamps: true,
});

module.exports = User;