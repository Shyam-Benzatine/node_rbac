const Sequelize = require('sequelize')
const sequelize = require("../db/connection");

const Post = sequelize.define('post', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    post_title: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    post_image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    post_description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    status: {
        type: Sequelize.NUMBER,
        allowNull: true,
    },
}, {
    timestamps: true
})

Post.sync() // Sync the model with the database
    .then(async () => {
        const queryInterface = sequelize.getQueryInterface();
        const table = 'posts';
        const columnName = 'status';

        // Get the table description to check if the column exists
        const tableDescription = await queryInterface.describeTable(table);

        if (!tableDescription[columnName]) {
            // The column does not exist, so add it
            await queryInterface.addColumn(table, columnName, {
                type: Sequelize.BOOLEAN,
                default: 1,
            });

            console.log('New column added successfully');
        } else {
            console.log('Column already exists');
        }
    })
    .catch((error) => {
        console.error('Error adding new column:', error);
    });

module.exports = Post;