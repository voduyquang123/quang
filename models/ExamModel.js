const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");

const ExamModel = sequelize.define("Exam", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  examDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

ExamModel.associate = (models) => {
  ExamModel.belongsTo(models.Classes, { foreignKey: "classId" });
  ExamModel.hasMany(models.Grade, { foreignKey: "examId" });
};

sequelize.sync().then(() => {
  console.log("Exam model synced with database");
});

module.exports = ExamModel;
