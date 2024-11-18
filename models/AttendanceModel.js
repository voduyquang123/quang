const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");

const Attendance = sequelize.define("attendance", {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "classes",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["present", "absent", "late"]],
    },
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", // Bảng users
      key: "id",
    },
  },
});

// Định nghĩa các mối quan hệ (associations)
Attendance.associate = (models) => {
  Attendance.belongsTo(models.User, { foreignKey: "studentId" });
  Attendance.belongsTo(models.Classes, { foreignKey: "classId" });
  Attendance.belongsTo(models.User, { foreignKey: "userID", as: "teacher" }); // Giáo viên
};

sequelize.sync().then(() => {
  console.log("Attendance model synced with database");
});

module.exports = Attendance;
