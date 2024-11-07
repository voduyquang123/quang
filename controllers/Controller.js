class Controller {
  req;
  res;

  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  success(data = [], code = 200) {
    return this.res.status(code).send({
      code: code,
      success: true,
      message: "Success",
      data: data,
    });
  }
  error(error = [], code = 422) {
    return this.res.status(200).send({
      code: code,
      success: true,
      message: "Error",
      error: error,
    });
  }
  response(data, code) {
    return code == 200 ? this.success(data, code) : this.error(data, code);
  }
}

module.exports = Controller;
