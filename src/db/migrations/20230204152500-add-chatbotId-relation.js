'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.changeColumn(
        'Chats',
        'chatbotId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Chatbots',
            key: 'id',
          },
          onUpdate: 'SET NULL',
          onDelete: 'SET NULL',
        },
        { transaction: t },
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('Chats', 'chatbotId', {
        transaction: t,
      });

      await queryInterface.addColumn(
        'Chats',
        'chatbotId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        {
          transaction: t,
        },
      );
    });
  },
};
