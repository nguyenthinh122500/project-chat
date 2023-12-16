const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { successCode, errorCode, failCode } = require("../reponse/reponse");
const models = initModel(sequelize);
const { Op, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const getListUser = async (req, res) => {
  try {
    const user = await models.Users.findAll({});

    successCode(res, user, "Get List User Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};


const getUserByID = async (req, res) => {
  try {
    const {UserID} = req.params;
    const user = await models.Users.findAll({where:{UserID}});

    successCode(res, user, "Get User Successfully!!!");
  } catch (error) {
    console.error("Error:", error);
    return errorCode(res, "Backend error");
  }
};

const getMessage = async (req, res) => {
  try {
    const { SenderID, ReceiverID } = req.params;
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

    successCode(res, mess, "Lấy Danh sách tin nhắn thành công");
  } catch (error) {
    console.error("Error saving message:", error);
  }
};

const getUserMessages = async (req, res) => {
  try {
    const {user} = req.body
console.log(user)
    const messages = await models.PrivateMessages.findAll({
      where: {
        [Op.or]: [
          { SenderID: { [Op.in]: user }, ReceiverID: { [Op.in]: user } },
        ],
      },
      include: [
        { model: models.Users, as: "Sender" },
        { model: models.Users, as: "Receiver" },
      ],
      order: [["SentTime", "ASC"]],
    });
    successCode(res,messages,"Lấy thành công")
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng với email được cung cấp
    const user = await models.Users.findOne({ where: { Email: email } });

    // Kiểm tra xem người dùng có tồn tại không và so sánh mật khẩu
    if (user) {
      // Mật khẩu hợp lệ, đăng nhập thành công
      successCode(res, user, "Đăng nhập thành công");
    } else {
      // Người dùng không tồn tại
      errorCode(res, "Người dùng không tồn tại");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    errorCode(res, "Đã xảy ra lỗi");
  }
};





const chargeMonthlyFee = async (req,res) => {
  try {

    const {userId, feeAmount} = req.body
    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const userInfo = await await models.Users.findOne({where:{UserID : userId}});

    // Kiểm tra xem số dư có đủ để trừ không
    if (userInfo.Balance >= feeAmount) {
      // Trừ tiền từ số dư hiện tại
      const newBalance = userInfo.Balance - feeAmount;

      // Cập nhật số dư mới vào cơ sở dữ liệu

      const user= await models.Users.update({
        Balance:newBalance
      } , {where:{UserID: userId}})

      // Trả về kết quả hoặc thông báo thành công
      successCode(res, user, "Trừ tiền thành công")
    } else {
      // Nếu số dư không đủ, thông báo cho người dùng
      failCode(res,  "Không đủ tiền")
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error charging monthly fee:", error);
    return { success: false, message: "Có lỗi xảy ra khi trừ phí hàng tháng" };
  }
};


module.exports = { getListUser, getMessage, Login, getUserMessages , chargeMonthlyFee , getUserByID};
