var DataTypes = require("sequelize").DataTypes;
var _ChannelChatMessages = require("./ChannelChatMessages");
var _ChannelMembers = require("./ChannelMembers");
var _Channels = require("./Channels");
var _ChatGroups = require("./ChatGroups");
var _GroupChatMessages = require("./GroupChatMessages");
var _GroupMembers = require("./GroupMembers");
var _PrivateMessages = require("./PrivateMessages");
var _Users = require("./Users");

function initModels(sequelize) {
  var ChannelChatMessages = _ChannelChatMessages(sequelize, DataTypes);
  var ChannelMembers = _ChannelMembers(sequelize, DataTypes);
  var Channels = _Channels(sequelize, DataTypes);
  var ChatGroups = _ChatGroups(sequelize, DataTypes);
  var GroupChatMessages = _GroupChatMessages(sequelize, DataTypes);
  var GroupMembers = _GroupMembers(sequelize, DataTypes);
  var PrivateMessages = _PrivateMessages(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Channels.belongsToMany(Users, { as: 'MemberID_Users', through: ChannelMembers, foreignKey: "ChannelID", otherKey: "MemberID" });
  ChatGroups.belongsToMany(Users, { as: 'MemberID_Users_GroupMembers', through: GroupMembers, foreignKey: "GroupID", otherKey: "MemberID" });
  Users.belongsToMany(Channels, { as: 'ChannelID_Channels', through: ChannelMembers, foreignKey: "MemberID", otherKey: "ChannelID" });
  Users.belongsToMany(ChatGroups, { as: 'GroupID_ChatGroups', through: GroupMembers, foreignKey: "MemberID", otherKey: "GroupID" });
  ChannelChatMessages.belongsTo(Channels, { as: "Channel", foreignKey: "ChannelID"});
  Channels.hasMany(ChannelChatMessages, { as: "ChannelChatMessages", foreignKey: "ChannelID"});
  ChannelMembers.belongsTo(Channels, { as: "Channel", foreignKey: "ChannelID"});
  Channels.hasMany(ChannelMembers, { as: "ChannelMembers", foreignKey: "ChannelID"});
  GroupChatMessages.belongsTo(ChatGroups, { as: "Group", foreignKey: "GroupID"});
  ChatGroups.hasMany(GroupChatMessages, { as: "GroupChatMessages", foreignKey: "GroupID"});
  GroupMembers.belongsTo(ChatGroups, { as: "Group", foreignKey: "GroupID"});
  ChatGroups.hasMany(GroupMembers, { as: "GroupMembers", foreignKey: "GroupID"});
  ChannelChatMessages.belongsTo(Users, { as: "Sender", foreignKey: "SenderID"});
  Users.hasMany(ChannelChatMessages, { as: "ChannelChatMessages", foreignKey: "SenderID"});
  ChannelMembers.belongsTo(Users, { as: "Member", foreignKey: "MemberID"});
  Users.hasMany(ChannelMembers, { as: "ChannelMembers", foreignKey: "MemberID"});
  Channels.belongsTo(Users, { as: "Creator", foreignKey: "CreatorID"});
  Users.hasMany(Channels, { as: "Channels", foreignKey: "CreatorID"});
  ChatGroups.belongsTo(Users, { as: "Creator", foreignKey: "CreatorID"});
  Users.hasMany(ChatGroups, { as: "ChatGroups", foreignKey: "CreatorID"});
  GroupChatMessages.belongsTo(Users, { as: "Sender", foreignKey: "SenderID"});
  Users.hasMany(GroupChatMessages, { as: "GroupChatMessages", foreignKey: "SenderID"});
  GroupMembers.belongsTo(Users, { as: "Member", foreignKey: "MemberID"});
  Users.hasMany(GroupMembers, { as: "GroupMembers", foreignKey: "MemberID"});
  PrivateMessages.belongsTo(Users, { as: "Sender", foreignKey: "SenderID"});
  Users.hasMany(PrivateMessages, { as: "PrivateMessages", foreignKey: "SenderID"});
  PrivateMessages.belongsTo(Users, { as: "Receiver", foreignKey: "ReceiverID"});
  Users.hasMany(PrivateMessages, { as: "Receiver_PrivateMessages", foreignKey: "ReceiverID"});

  return {
    ChannelChatMessages,
    ChannelMembers,
    Channels,
    ChatGroups,
    GroupChatMessages,
    GroupMembers,
    PrivateMessages,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
