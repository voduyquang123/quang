const sequelize = require("../config/connect");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Email không hợp lệ.",
      },
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
});

sequelize.sync().then(() => {
  console.log("User model synced with database");
});

module.exports = User;
