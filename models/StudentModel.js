const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");

const StudentModel = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //   age: {
  //     type: DataTypes.INTEGER,
  //     allowNull: true,
  //   },
});

StudentModel.associate = (models) => {
  StudentModel.belongsTo(models.Classes, { foreignKey: "classId" });
  StudentModel.hasMany(models.Enrollment, { foreignKey: "studentId" });
  StudentModel.hasMany(models.Attendance, { foreignKey: "studentId" });
  StudentModel.hasMany(models.Grade, { foreignKey: "studentId" });
};

sequelize.sync().then(() => {
  console.log("Student model synced with database");
});

module.exports = StudentModel;
