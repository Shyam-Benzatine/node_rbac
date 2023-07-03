const Sequelize = require('sequelize')
const sequelize = require('./connection')
const Role = require('../models/Role')
const Module = require('../models/Module')
const RolePermission = require('../models/RolePermission')
const User = require('../models/User')
const UserPermission = require('../models/UserPermission')
const Post = require('../models/Post')

Role.hasMany(RolePermission, { foreignKey: 'role_id' });
Module.hasMany(RolePermission, { foreignKey: 'module_id' });

RolePermission.belongsTo(Role, { foreignKey: 'role_id' });
RolePermission.belongsTo(Module, { foreignKey: 'module_id' });


User.belongsTo(Role, { foreignKey: 'role_id' });
User.hasMany(UserPermission, { foreignKey: 'user_id' });
User.hasMany(Post, { foreignKey: 'user_id' });

UserPermission.belongsTo(User, { foreignKey: 'user_id' });
UserPermission.belongsTo(Module, { foreignKey: 'module_id' });

Post.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync().then(() => {
    console.log('All tables created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
