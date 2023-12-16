const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { successCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");




const getListChannel = async (req, res) => {
    try {
        const {id} = req.params;
        const channel = await models.ChannelMembers.findAll({
            where: { MemberID: Number(id) },
            include: [{ model: models.Channels, as: "Channel" },{ model: models.Users, as: "Member" }]
          });
  
      successCode(res, channel, "Get List Channel Successfully!!!");
    } catch (error) {
      console.error("Error:", error);
      return errorCode(res, "Backend error");
    }
  };


  const getChannelByID = async (req, res) => {
    try {
        const {id} = req.params;
        const channel = await models.Channels.findOne({
            where: { ChannelID: Number(id) },
          
          });
  
      successCode(res, channel, "Get  Channel Successfully!!!");
    } catch (error) {
      console.error("Error:", error);
      return errorCode(res, "Backend error");
    }
  };

  const getMessChannel = async (req, res) => {
    try {
        const {id} = req.params;
        const channel = await models.ChannelChatMessages.findAll({
            where: { ChannelID: Number(id) },
            include: [{ model: models.Channels, as: "Channel" },{ model: models.Users, as: "Sender" }]
          });
      successCode(res, channel, "Get Message Channel Successfully!!!");
    } catch (error) {
      console.error("Error:", error);
      return errorCode(res, "Backend error");
    }
  };

  const getMemberChannel = async (req, res) => {
    try {
        const {id} = req.params;
        const channel = await models.ChannelMembers.findAll({
            where: { ChannelID: Number(id) },
          
          });
      successCode(res, channel, "Get Member Channel Successfully!!!");
    } catch (error) {
      console.error("Error:", error);
      return errorCode(res, "Backend error");
    }
  };
  module.exports = {getListChannel, getMessChannel, getChannelByID ,getMemberChannel}