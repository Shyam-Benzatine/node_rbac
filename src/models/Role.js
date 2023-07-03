const Sequelize = require('sequelize');
const sequelize = require('../db/connection'); // Replace with the actual path to your db.js file

const Role = sequelize.define('role', {
  // Define your model attributes
  role_name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
},{
  timestamps: true,
});

module.exports = Role;