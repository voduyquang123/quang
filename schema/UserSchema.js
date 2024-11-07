const sequelize = require("../configs/connect");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  // các thuộc tinh của mô hình
  phone: {
    type: DataTypes.STRING,
  },

  password: {
    type: DataTypes.STRING,
  },
});

sequelize.sync().then(() => {
  console.log("Bảng User đã được tạo.");
});
module.exports = User;
