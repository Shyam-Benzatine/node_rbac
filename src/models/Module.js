const Sequelize = require('sequelize');
const sequelize = require('../db/connection'); // Replace with the actual path to your db.js file

const Module = sequelize.define('module', {
  // Define your model attributes
  module_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},{
    timestamps: true,
  });

module.exports = Module;