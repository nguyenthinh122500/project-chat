const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GroupMembers', {
    GroupID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ChatGroups',
        key: 'GroupID'
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
    tableName: 'GroupMembers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "GroupID" },
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
