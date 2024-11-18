const sequelize = require("../config/connect");
const { DataTypes } = require("sequelize");
const Controller = require("./Controller");

const UserModel = require("../models/UserModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const validator = require("validator");

const secret = "#$243Rds";

class AuthController extends Controller {
  next;

  constructor(req, res, next) {
    super(req, res);
    this.next = next;
  }

  async authentication() {
    let token = this.req.headers["authorization"];

    if (!token) {
      return this.error("Vui lòng nhập token.");
    }

    token = token.split(" ")[1];
    try {
      const decoded = jwt.verify(token, secret);

      if (!decoded) {
        return this.error("Token hết hạn.");
      }

      this.req.user = decoded;
      this.next();
    } catch (err) {
      return this.error("Token không đúng định dạng.");
    }
  }

  async login() {
    let { phone, password } = this.req.body;

    if (!password) {
      return this.error("Mật khẩu không được rỗng.");
    }

    if (!phone) {
      return this.error("Số điện thoại không được rỗng.");
    }

    if (!validator.isMobilePhone(phone, "any")) {
      return this.error("Số điện thoại không hợp lệ.");
    }

    const model = new UserModel();

    const auth_check_phone = await model.auth_check_phone(phone);
    if (!auth_check_phone) {
      return this.error("Số điện thoại không tồn tại.");
    }

    const hash = auth_check_phone["password"];
    const result = bcrypt.compareSync(password, hash);

    if (!result) {
      return this.error("Đăng nhập thất bại.");
    }

    const data = auth_check_phone.get();
    delete data.password;

    const token = jwt.sign({ data }, secret, { expiresIn: 60 * 60 }); // 1h

    const response = this.success(token);
    return response;
  }

  logout() {
    const response = this.success();
    return response;
  }
}

module.exports = AuthController;
