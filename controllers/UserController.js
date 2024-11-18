const { response } = require("express");
const Controller = require("./Controller");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const validator = require("validator"); // Import thư viện validator

class UserController extends Controller {
  constructor(req, res) {
    super(req, res);
  }

  findAll() {
    const response = this.success();
    return response;
  }

  finOne(id) {
    const response = this.success();
    return response;
  }

  async create() {
    let { phone, password, name, email } = this.req.body;

    if (!email) {
      return this.error("Email không được rỗng.");
    }

    if (!password) {
      return this.error("Mật khẩu không được rỗng.");
    }

    if (!phone) {
      return this.error("Số điện thoại không được rỗng.");
    }

    if (!validator.isMobilePhone(phone, "any")) {
      return this.error("Số điện thoại không hợp lệ.");
    }
    // kiểm tra dữ liệu

    //thêm dữ liệu vào database
    const model = new UserModel();

    // kiểm tra phone có tồn tại trong db ko
    const check_phone = await model.check_phone(phone);

    if (check_phone) {
      return this.error("Số điện thoại đã tồn tại ");
    }

    //check email
    const check_email = await model.check_email(email);
    if (check_email) {
      return this.error("Email đã tồn tại ");
    }
    // Tạo salt và mã hóa mật khẩu
    const salt = bcrypt.genSaltSync(10); // Thêm dòng này để tạo salt
    password = bcrypt.hashSync(password, salt);

    const result = await model.create({ phone, password, email, name });
    if (result.status == "error") {
      return this.error(result.message);
    }
    return this.success(result);
  }

  update(id) {
    let { phone } = this.req.body;
    if (!phone || !validator.isMobilePhone(phone, "any")) {
      return this.error("Số điện thoại không hợp lệ.");
    }

    const model = new UserModel();
    const response = this.success();
    return response;
  }

  delete(id) {
    const response = this.success();
    return response;
  }

  updatePassord(id) {
    let { password_old, password_new, re_password_new } = this.req.body;

    const response = this.success();
    return response;
  }
}
module.exports = UserController;
// ko sua phone email , password
