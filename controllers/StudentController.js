const Controller = require("./Controller");
const StudentModel = require("../models/StudentModel");

class StudentController extends Controller {
  constructor(req, res) {
    super(req, res);
  }
  async findAll() {
    try {
      const students = await StudentModel.findAll();
      return this.success(students);
    } catch (error) {
      console.error(error);
      return this.error("Đã xảy ra lỗi khi lấy danh sách học sinh.");
    }
  }

  async findOne(id) {
    try {
      const student = await StudentModel.findByPk(id);
      if (!student) {
        return this.error("Học sinh không tồn tại.");
      }
      return this.success(student);
    } catch (error) {
      console.error(error);
      return this.error("Đã xảy ra lỗi khi lấy thông tin học sinh.");
    }
  }

  async create() {
    const { name, classId } = this.req.body;

    if (!name || !classId) {
      return this.error("Tên học sinh và mã lớp không được rỗng.");
    }

    try {
      const newStudent = await StudentModel.create({ name, classId });
      return this.success(newStudent);
    } catch (error) {
      console.error(error);
      return this.error("Đã xảy ra lỗi khi tạo học sinh.");
    }
  }

  async update(id) {
    const { name, classId } = this.req.body;

    if (!name || !classId) {
      return this.error("Tên học sinh và mã lớp không được rỗng.");
    }

    try {
      const [updated] = await StudentModel.update(
        { name, classId },
        { where: { id } }
      );

      if (!updated) {
        return this.error("Không tìm thấy học sinh để cập nhật.");
      }

      return this.success("Thông tin học sinh đã được cập nhật.");
    } catch (error) {
      console.error(error);
      return this.error("Đã xảy ra lỗi khi cập nhật học sinh.");
    }
  }

  async delete(id) {
    try {
      const deleted = await StudentModel.destroy({ where: { id } });
      if (!deleted) {
        return this.error("Không tìm thấy học sinh để xóa.");
      }

      return this.success("Học sinh đã được xóa.");
    } catch (error) {
      console.error(error);
      return this.error("Đã xảy ra lỗi khi xóa học sinh.");
    }
  }
}

module.exports = StudentController;
