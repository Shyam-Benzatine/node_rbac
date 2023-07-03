module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Perform database operations using queryInterface and Sequelize
      await queryInterface.bulkInsert('modules', [
        { module_name: 'Post' },
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      // Undo the database operations if needed
      await queryInterface.bulkDelete('modules', null, {});
    },
  };