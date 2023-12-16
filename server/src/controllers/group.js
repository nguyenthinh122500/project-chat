const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { successCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");




const getListGourp = async (req, res) => {
    try {
        const {id} = req.params;
        const group = await models.GroupMembers.findAll({
            where: { MemberID: Number(id) },
            include: [{ model: models.ChatGroups, as: "Group" },{ model: models.Users, as: "Member" }]
          });
  
      successCode(res, group, "Get List Group Successfully!!!");
    } catch (error) {
      console.error("Error:", error);
      return errorCode(res, "Backend error");
    }
  };

  const getMemberGourp = async (req, res) => {
    try {
        const {id} = req.params;
        const group = await models.GroupMembers.findAll({
            where: { GroupID: Number(id) },
            include: [{ model: models.ChatGroups, as: "Group" },{ model: models.Users, as: "Member" }]
          });
  
      successCode(res, group, "Get List Group Successfully!!!");
    } catch (error) {
      console.error("Error:", error);
      return errorCode(res, "Backend error");
    }
  };




  const getMessGroup = async (req, res) => {
    try {
        const {id} = req.params;
        const group = await models.GroupChatMessages.findAll({
            where: { GroupID: Number(id) },
            include: [{ model: models.Users, as: "Sender" }]
          });
  
      successCode(res, group, "Get List Group Successfully!!!");
    } catch (error) {
      console.error("Error:", error);
      return errorCode(res, "Backend error");
    }
  };
  module.exports = {getListGourp, getMemberGourp, getMessGroup}
