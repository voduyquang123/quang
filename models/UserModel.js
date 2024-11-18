// const Model = require("./Model");

// const UserSchema = require("../schema/UserSchema");

// class UserModel extends Model {
//   finAll() {
//     // const response = this.success();
//     const data = [];
//     return data;
//   }

//   finOne(id) {
//     // const response = this.success();
//     const data = [];
//     return data;
//   }

//   async create(obj = {}) {
//     try {
//       const user = await UserSchema.create(obj);
//       return user;
//     } catch (error) {
//       const errors = error.errors.map((err) => err.message);
//       return { status: "error", messages: errors };
//     }
//   }

//   update(id) {
//     // const response = this.success();
//     const data = [];
//     return data;
//   }

//   delete(id) {
//     // const response = this.success();
//     const data = [];
//     return data;
//   }

//   async check_phone(phone) {
//     try {
//       const exists = await UserSchema.findOne({
//         where: {
//           phone,
//         },
//       });
//       const result = !!exists;
//       return result;
//     } catch (error) {
//       return error.messager;
//     }
//   }

//   async check_email(email) {
//     try {
//       const exists = await UserSchema.findOne({
//         where: {
//           email,
//         },
//       });
//       const result = !!exists;
//       return result;
//     } catch (error) {
//       return error.messager;
//     }
//   }

//   async auth_check_phone(phone) {
//     try {
//       const data = await UserSchema.findOne({
//         where: {
//           phone,
//         },
//       });
//       return data;
//     } catch (error) {
//       return false;
//     }
//   }
// }
// module.exports = UserModel;

const UserSchema = require("../schema/UserSchema");
const Model = require("./Model");

class UserModel extends Model {
  findAll() {
    const data = [];
    return data;
  }

  findOne(id) {
    const data = [];
    return data;
  }

  async create(obj = {}) {
    try {
      const user = await UserSchema.create(obj);
      return user;
    } catch (error) {
      const errors = error.errors.map((err) => err.message);
      return { status: "error", messages: errors };
    }
  }

  update(id) {
    const data = [];
    return data;
  }

  delete(id) {
    const data = [];
    return data;
  }

  async check_phone(phone) {
    try {
      const exists = await UserSchema.findOne({
        where: {
          phone,
        },
      });
      const result = !!exists;
      return result;
    } catch (error) {
      return false;
    }
  }

  async check_email(email) {
    try {
      const exists = await UserSchema.findOne({
        where: {
          email,
        },
      });
      const result = !!exists;
      return result;
    } catch (error) {
      return false;
    }
  }

  // async auth_check_phone(phone) {
  //   try {
  //     const data = await UserSchema.findOne({
  //       where: {
  //         phone,
  //       },
  //     });
  //     return data;
  //   } catch (error) {
  //     return false;
  //   }
  // }
  async auth_check_phone(phone) {
    try {
      console.log("Checking phone:", phone); // Kiểm tra xem số điện thoại nhận vào là gì
      const data = await UserSchema.findOne({
        where: {
          phone,
        },
      });
      return data;
    } catch (error) {
      console.error("Error in auth_check_phone:", error);
      return false;
    }
  }
}

module.exports = UserModel;
