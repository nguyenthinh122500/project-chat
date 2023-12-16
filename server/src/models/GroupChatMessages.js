const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GroupChatMessages', {
    GroupMessageID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    GroupID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ChatGroups',
        key: 'GroupID'
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
    tableName: 'GroupChatMessages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "GroupMessageID" },
        ]
      },
      {
        name: "GroupID",
        using: "BTREE",
        fields: [
          { name: "GroupID" },
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
