const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");
const StudentModel = require("./StudentModel");
const ExamModel = require("./ExamModel");

const Grade = sequelize.define("Grade", {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: StudentModel,
      key: "id",
    },
  },
  examId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ExamModel,
      key: "id",
    },
  },
  grade: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Grade.associate = (models) => {
  Grade.belongsTo(models.Student, { foreignKey: "studentId" });
  Grade.belongsTo(models.Exam, { foreignKey: "examId" });
};

sequelize.sync().then(() => {
  console.log("Grade model synced with database");
});

module.exports = Grade;
