const sequelize = require("../config/connect");
const { DataTypes } = require("sequelize");

const ClassesModel = sequelize.define(
  "class",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Đảm bảo mã lớp là duy nhất
    },
  }

  // {
  //   indexes: [
  //     {
  //       unique: true,
  //       fields: ["code"], // Tạo chỉ mục duy nhất cho cột 'code'
  //       name: "code_index", // Đặt tên cho chỉ mục
  //     },
  //   ],
  // }
);

sequelize.sync().then(() => {
  console.log("Class model synced with database");
});

module.exports = ClassesModel;
