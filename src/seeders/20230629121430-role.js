module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Perform database operations using queryInterface and Sequelize
      await queryInterface.bulkInsert('roles', [
        { role_name: 'Super Admin' },
        { role_name: 'Admin' },
        { role_name: 'User' },
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      // Undo the database operations if needed
      await queryInterface.bulkDelete('roles', null, {});
    },
  };