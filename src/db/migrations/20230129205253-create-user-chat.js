'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        'Users',
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
          },
          userName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
        },
        { transaction: t },
      );

      await queryInterface.createTable(
        'Chats',
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
          },
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          chatbotId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          createdAt: Sequelize.DATE,
          updatedAt: Sequelize.DATE,
        },
        { transaction: t },
      );

      await queryInterface.addColumn(
        'Users',
        'currentChatId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'Chats', key: 'id' },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        { transaction: t },
      );
    });
  },

  down: async (queryInterface) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('Chats', { transaction: t });
      await queryInterface.dropTable('Users', { transaction: t });
    });
  },
};
