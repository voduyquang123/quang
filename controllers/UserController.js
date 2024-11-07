const { response } = require("express");
const Controller = require("./Controller");
const UserModel = require("../models/UserModel");

class UserController extends Controller {
  email;
  phone;

  constructor(req, res) {
    super(req, res);
  }

  finAll() {
    const response = this.success();
    return response;
  }

  finOne(id) {
    const response = this.success();
    return response;
  }

  async create() {
    const { phone, password } = this.req.body;

    // kiểm tra dữ liệu

    //thêm dữ liệu vào database
    const model = new UserModel();
    const data = await model.create({ phone, password });

    const response = this.success(data);
    return response;
  }

  update(id) {
    const response = this.success();
    return response;
  }

  delete(id) {
    const response = this.success();
    return response;
  }
}
// học tới 48:39
module.exports = UserController;
