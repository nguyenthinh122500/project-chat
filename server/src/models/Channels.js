const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Channels', {
    ChannelID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ChannelName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    CreatorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'UserID'
      }
    }
  }, {
    sequelize,
    tableName: 'Channels',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ChannelID" },
        ]
      },
      {
        name: "CreatorID",
        using: "BTREE",
        fields: [
          { name: "CreatorID" },
        ]
      },
    ]
  });
};
