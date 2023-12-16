const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PrivateMessages', {
    MessageID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SenderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'UserID'
      }
    },
    ReceiverID: {
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
    tableName: 'PrivateMessages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MessageID" },
        ]
      },
      {
        name: "SenderID",
        using: "BTREE",
        fields: [
          { name: "SenderID" },
        ]
      },
      {
        name: "ReceiverID",
        using: "BTREE",
        fields: [
          { name: "ReceiverID" },
        ]
      },
    ]
  });
};
