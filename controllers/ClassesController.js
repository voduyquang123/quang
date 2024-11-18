const Controller = require("./Controller");
const ClassesModel = require("../models/ClassesModel");

class ClassesController extends Controller {
  constructor(req, res) {
    super(req, res);
  }

  async findAll() {
    try {
      const classes = await ClassesModel.findAll();
      return this.success(classes);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi lấy danh sách lớp học.");
    }
  }

  async findOne() {
    const { id } = this.req.params;

    if (!id) {
      return this.error("Cần phải có id lớp học.");
    }

    try {
      const classItem = await ClassesModel.findOne({ where: { id } });

      if (!classItem) {
        return this.error("Không tìm thấy lớp học với id này.");
      }

      return this.success(classItem);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi lấy thông tin lớp học.");
    }
  }

  async create() {
    const { name, code } = this.req.body;

    if (!name || !code) {
      return this.error("Tên lớp và mã lớp không được rỗng.");
    }

    try {
      const existingClass = await ClassesModel.findOne({ where: { code } });
      if (existingClass) {
        return this.error("Mã lớp đã tồn tại.");
      }

      const newClass = await ClassesModel.create({ name, code });
      return this.success(newClass);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi tạo lớp học.");
    }
  }

  async update(id) {
    const { name, code } = this.req.body;

    try {
      const [updatedRows] = await ClassesModel.update(
        { name, code },
        { where: { id } }
      );

      if (updatedRows === 0) {
        return this.error("Không tìm thấy lớp học với id này để cập nhật.");
      }

      return this.success("Lớp học đã được cập nhật.");
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi cập nhật lớp học.");
    }
  }

  async delete(id) {
    try {
      const deletedRows = await ClassesModel.destroy({ where: { id } });

      if (deletedRows === 0) {
        return this.error("Không tìm thấy lớp học với id này để xóa.");
      }

      return this.success("Lớp học đã được xóa.");
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi xóa lớp học.");
    }
  }
}

module.exports = ClassesController;
