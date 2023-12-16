const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChannelMembers', {
    ChannelID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Channels',
        key: 'ChannelID'
      }
    },
    MemberID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'UserID'
      }
    }
  }, {
    sequelize,
    tableName: 'ChannelMembers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ChannelID" },
          { name: "MemberID" },
        ]
      },
      {
        name: "MemberID",
        using: "BTREE",
        fields: [
          { name: "MemberID" },
        ]
      },
    ]
  });
};
