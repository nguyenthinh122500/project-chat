const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const models = initModel(sequelize);
const { Op } = require("sequelize");

const socketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on(
      "sendMessage",
      async ({ SenderID, ReceiverID, MessageType, Content }) => {
        try {
          const message = await models.PrivateMessages.create({
            SenderID,
            ReceiverID,
            MessageType,
            Content,
          });

          const mess = await models.PrivateMessages.findAll({
            where: {
              [Op.or]: [
                { SenderID, ReceiverID },
                { SenderID: ReceiverID, ReceiverID: SenderID }, // Đảo ngược SenderID và ReceiverID để lấy tin nhắn theo cả 2 chiều
              ],
            },
            include: [
              { model: models.Users, as: "Sender" }, // Include thông tin người gửi
              { model: models.Users, as: "Receiver" }, // Include thông tin người nhận
            ],
            order: [["SentTime", "ASC"]], // Sắp xếp theo thời gian gửi
          });

          io.emit("messageReceived", mess);
        } catch (error) {
          console.error("Error saving message:", error);
        }
      }
    );

    socket.on(
      "sendMessageGroup",
      async ({ SenderID, MessageType, Content, GroupID }) => {
        try {
          const message = await models.GroupChatMessages.create({
            SenderID,
            GroupID,
            MessageType,
            Content,
          });

          const mess = await models.GroupChatMessages.findAll({
            where: {
              GroupID,
            },
            include: [
              { model: models.Users, as: "Sender" }, // Include thông tin người gửi
            ],
            order: [["SentTime", "ASC"]], // Sắp xếp theo thời gian gửi
          });

          io.emit("messageReceivedGroup", mess);
        } catch (error) {
          console.error("Error saving message:", error);
        }
      }
    );

    socket.on(
      "sendMessageChannel",
      async ({ SenderID, MessageType, Content, ChannelID }) => {
        try {
          const message = await models.ChannelChatMessages.create({
            SenderID,
            ChannelID,
            MessageType,
            Content,
          });

          const mess = await models.ChannelChatMessages.findAll({
            where: {
              ChannelID,
            },
            include: [
              { model: models.Users, as: "Sender" }, // Include thông tin người gửi
            ],
            order: [["SentTime", "ASC"]], // Sắp xếp theo thời gian gửi
          });

          io.emit("messageReceivedChannel", mess);
        } catch (error) {
          console.error("Error saving message:", error);
        }
      }
    );

    socket.on("createGroup", async ({ GroupName, CreatorID, MemberID }) => {
      try {
        const newGroup = await models.ChatGroups.create({
          GroupName,
          CreatorID,
        });

        if (newGroup) {
          socket.join(`${CreatorID}`);

          // Gửi thông báo đến user có ID = 1
          socket.emit("notification", {
            message: `Tạo thành công nhóm ${GroupName}!`,
            receiverID: CreatorID,
          });

          const groups = await models.GroupMembers.create({
            GroupID: newGroup.GroupID,
            MemberID: CreatorID,
          });
          if (MemberID && MemberID.length > 0) {
            const membersToAdd = await Promise.all(
              MemberID.map(async (id) => {
                return await models.GroupMembers.create({
                  GroupID: newGroup.GroupID,
                  MemberID: id,
                });
              })
            );

            // await models.GroupMembers.bulkCreate(membersToAdd);

            membersToAdd.forEach(({ MemberID }) => {
              socket.join(`group_${newGroup.GroupID}`);
            });

            const group = await models.GroupMembers.findAll({
              include: [
                {
                  model: models.ChatGroups,
                  as: "Group",
                  include: [{ model: models.Users, as: "Creator" }],
                },
              ],
            });

            io.emit("addtogroup", group);
          }
        }
      } catch (error) {
        console.error("Error creating group:", error);
      }
    });
    
    socket.on("createChannel", async ({ ChannelName, CreatorID, MemberID }) => {
      try {
        const newChannel = await models.Channels.create({
          ChannelName,
          CreatorID,
        });

        if (newChannel) {
          socket.join(`${CreatorID}`);

          // Gửi thông báo đến user có ID = 1
          // socket.emit("notification", {
          //   message: `Tạo thành công channel ${GroupName}!`,
          //   receiverID: CreatorID,
          // });

          const groups = await models.ChannelMembers.create({
            ChannelID: newChannel.ChannelID,
            MemberID: CreatorID,
          });
          if (MemberID && MemberID.length > 0) {
            const membersToAdd = await Promise.all(
              MemberID.map(async (id) => {
                return await models.ChannelMembers.create({
                  ChannelID: newChannel.ChannelID,
                  MemberID: id,
                });
              })
            );

            // await models.GroupMembers.bulkCreate(membersToAdd);

            membersToAdd.forEach(({ MemberID }) => {
              socket.join(`group_${newChannel.ChannelID}`);
            });

            const group = await models.ChannelMembers.findAll({
              include: [
                {
                  model: models.Channels,
                  as: "Channel",
                  include: [{ model: models.Users, as: "Creator" }],
                },
              ],
            });

            io.emit("addtochannel", group);
          }
        }
      } catch (error) {
        console.error("Error creating group:", error);
      }
    });

    socket.on("addMemberChannel", async ({  ChannelID, MemberID }) => {
      try {
     


          // Gửi thông báo đến user có ID = 1
          // socket.emit("notification", {
          //   message: `Tạo thành công channel ${GroupName}!`,
          //   receiverID: CreatorID,
          // });


          if (MemberID && MemberID.length > 0) {
            const membersToAdd = await Promise.all(
              MemberID.map(async (id) => {
                return await models.ChannelMembers.create({
                  ChannelID,
                  MemberID: id,
                });
              })
            );

            // await models.GroupMembers.bulkCreate(membersToAdd);

           

            const group = await models.ChannelMembers.findAll({
              include: [
                {
                  model: models.Channels,
                  as: "Channel",
                  include: [{ model: models.Users, as: "Creator" }],
                },
              ],
            });

            io.emit("addtochannel", group);
          }
        
      } catch (error) {
        console.error("Error creating group:", error);
      }
    });

    socket.on("deleteMemberChannel", async ({   MemberID }) => {
      try {
    
          if (MemberID && MemberID.length > 0) {
            const membersToAdd = await Promise.all(
              MemberID.map(async (id) => {
                return await models.ChannelMembers.destroy({
                  where: {
                    MemberID: id,
                  },
                });
              })
            );

            // await models.GroupMembers.bulkCreate(membersToAdd);

           

            const group = await models.ChannelMembers.findAll({
              include: [
                {
                  model: models.Channels,
                  as: "Channel",
                  include: [{ model: models.Users, as: "Creator" }],
                },
              ],
            });

            io.emit("addtochannel", group);
          }
        
      } catch (error) {
        console.error("Error creating group:", error);
      }
    });




    socket.on("login", async ({ Username, Email, Password }) => {
      try {
        const newGroup = await models.Users.create({
          Username,
          Email,
          Password,
          Balance:1,
          AccountStatus:"active"
        });

        const user = await models.Users.findAll();

        io.emit("getlistuser", user);
      } catch (error) {
        console.error("Error creating group:", error);
      }
    });


    
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = socketEvents;
