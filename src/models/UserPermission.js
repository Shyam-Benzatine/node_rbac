const Sequelize = require('sequelize');
const sequelize = require('../db/connection'); 
const UserPermission = sequelize.define('user_permission', {
  // Define your model attributes

  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  module_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  create: {
    type: Sequelize.BOOLEAN,
    default: 1
  },
  view: {
    type: Sequelize.BOOLEAN,
    default: 1
  },
  update: {
    type: Sequelize.BOOLEAN,
    default: 1
  },
  delete: {
    type: Sequelize.BOOLEAN,
    default: 1
  },
  other: {
    type: Sequelize.BOOLEAN,
    default: 1
  },
}, {
  timestamps: true,
});


module.exports = UserPermission;