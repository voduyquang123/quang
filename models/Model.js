// const mysql = require("mysql2");

// const { DataTypes } = require("sequelize");
const sequelize = require("../config/connect");

class Model {
  // host = "localhost";
  // userdb = "root";
  // passdb = "";
  // namedb = "school";
  // db;

  constructor() {
    // console.log("db");
    // this.db = mysql.createPool({
    //   host: "localhost",
    //   user: "root",
    //   password: "root",
    //   database: "school",
    // });
    // this.db = new Sequelize(this.namedb, this.userdb, this.passdb, {
    //   host: this.host,
    //   dialect: "mysql",
    // });
    // this.db
    //   .authenticate()
    //   .then(() => {
    //     console.log("Connection has been established successfully.");
    //   })
    //   .catch((err) => {
    //     console.error("Unable to connect to the database:", err);
    //   });
    // this.db = sequelize;
  }
}
module.exports = Model;
