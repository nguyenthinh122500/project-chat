const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChatGroups', {
    GroupID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    GroupName: {
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
    tableName: 'ChatGroups',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "GroupID" },
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
