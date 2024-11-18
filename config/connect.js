const { Sequelize } = require("sequelize");

const host = "localhost";
const username = "root";
const password = "";
const dbname = "school";

const sequelize = new Sequelize(dbname, username, password, {
  host,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("kết nối cơ sở dữ liệu MySQL  thành công.");
  })
  .catch((err) => {
    console.error("không thể kết nối đến cơ sở dữ liệu", err);
  });

module.exports = sequelize;
