const express = require("express");
const http = require("http");
const cors = require("cors");
const routes = require("./routes");
const socketIO = require("socket.io");
const socketEvents = require("./controllers/message");
const cron = require("node-cron");

const app = express();
app.use(express.json());
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // hoặc địa chỉ của ứng dụng React của bạn
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketEvents(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(cors()); // Nếu cần, có thể áp dụng cors middleware cho các route khác
app.use(express.json());
app.use(express.static("."));
app.use("/api/v1", routes);

const sequelize = require("./models/index");
const initModel = require("./models/init-models");
const { successCode, errorCode, failCode } = require("./reponse/reponse");
const models = initModel(sequelize);




// Định nghĩa hàm chargeMonthlyFee
const chargeMonthlyFee = async (userId, feeAmount) => {
  try {
    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const userInfo = await models.Users.findOne({ where: { UserID: userId } });

    // Kiểm tra xem số dư có đủ để trừ không
    if (userInfo.Balance >= feeAmount) {
      // Trừ tiền từ số dư hiện tại
      const newBalance = userInfo.Balance - feeAmount;

      // Cập nhật số dư mới vào cơ sở dữ liệu
      const updatedUser = await models.Users.update(
        { Balance: newBalance },
        { where: { UserID: userId } }
      );

      // Trả về kết quả hoặc thông báo thành công
      return {
        success: true,
        message: "Trừ tiền thành công",
        user: updatedUser,
      };
    } else {
      // Nếu số dư không đủ, thông báo cho người dùng
      const updatedUser = await models.Users.update(
        { AccountStatus: "inactive" },
        { where: { UserID: userId } }
      );
      return { success: false, message: "Không đủ tiền! Tài khoản bị khóa" };
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error charging monthly fee:", error);
    return { success: false, message: "Có lỗi xảy ra khi trừ phí hàng tháng" };
  }
};

cron.schedule("50 15 15 12 *", async () => {
  console.log("Running the monthly fee charge...");
  try {
    const users = await models.Users.findAll();
    // console.log(users)
    for (const user of users) {
      const result = await chargeMonthlyFee(Number(user.UserID), 10); // Thay thế 10 bằng feeAmount cụ thể của bạn
      // console.log(user.UserID)
      console.log(result); // In kết quả xử lý
    }
    io.emit('monthlyFeeCharged', 0); 
  } catch (error) {
    console.error("Error charging monthly fee:", error);
  }
});
