'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        'Chatbots',
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          language: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          apiName: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          apiEndpoint: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
        },
        { transaction: t },
      );
    });
  },

  down: async (queryInterface) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('Chatbots', { transaction: t });
    });
  },
};
