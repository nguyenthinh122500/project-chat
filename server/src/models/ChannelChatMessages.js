const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChannelChatMessages', {
    ChannelMessageID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ChannelID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Channels',
        key: 'ChannelID'
      }
    },
    SenderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'UserID'
      }
    },
    MessageType: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SentTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'ChannelChatMessages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ChannelMessageID" },
        ]
      },
      {
        name: "ChannelID",
        using: "BTREE",
        fields: [
          { name: "ChannelID" },
        ]
      },
      {
        name: "SenderID",
        using: "BTREE",
        fields: [
          { name: "SenderID" },
        ]
      },
    ]
  });
};
