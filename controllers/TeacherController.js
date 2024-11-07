const Controller = require("./Controller");
class TeacherController extends Controller {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
}
module.exports = TeacherController;
