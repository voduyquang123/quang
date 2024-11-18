const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");

const EnrollmentModel = sequelize.define("enrollment", {
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

EnrollmentModel.associate = (models) => {
  EnrollmentModel.belongsTo(models.Student, { foreignKey: "studentId" });
  EnrollmentModel.belongsTo(models.Subject, { foreignKey: "subjectId" });
  EnrollmentModel.belongsTo(models.Classes, { foreignKey: "classId" });
};

sequelize.sync().then(() => {
  console.log("Enrollment model synced with database");
});

module.exports = EnrollmentModel;
