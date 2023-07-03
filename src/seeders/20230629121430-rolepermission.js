module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Perform database operations using queryInterface and Sequelize
      await queryInterface.bulkInsert('role_permissions', [
        { role_id:"1",	module_id:'1'	,create:1	,view:1	,update:1	,delete:1,	other:1,	createdAt:"2023-01-01 06:00:00"	,updatedAt:'2023-01-01 06:00:00'	 },
        { role_id:"2",	module_id:'1'	,create:0	,view:1	,update:0	,delete:0,	other:0,	createdAt:"2023-01-01 06:00:00"	,updatedAt:'2023-01-01 06:00:00'	 },
        { role_id:"3",	module_id:'1'	,create:1	,view:1	,update:1	,delete:0,	other:0,	createdAt:"2023-01-01 06:00:00"	,updatedAt:'2023-01-01 06:00:00'	 },
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      // Undo the database operations if needed
      await queryInterface.bulkDelete('role_permissions', null, {});
    },
  };