'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        'Messages',
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
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          chatId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Chats', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          isFromUser: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          messageType: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          contents: {
            type: Sequelize.STRING,
            allowNull: false,
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
      await queryInterface.dropTable('Messages', { transaction: t });
    });
  },
};
