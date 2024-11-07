const Model = require("./Model");

const UserSchema = require("../schema/UserSchema");

class UserModel extends Model {
  finAll() {
    // const response = this.success();
    const data = [];
    return data;
  }

  finOne(id) {
    // const response = this.success();
    const data = [];
    return data;
  }

  async create(obj = {}) {
    // const response = this.success();

    try {
      const user = await UserSchema.create(obj);
      return user;
    } catch (error) {
      return error.message;
    }
  }

  update(id) {
    // const response = this.success();
    const data = [];
    return data;
  }

  delete(id) {
    // const response = this.success();
    const data = [];
    return data;
  }
}
module.exports = UserModel;
