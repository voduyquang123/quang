const Controller = require("./Controller");
const ExamModel = require("../models/ExamModel");

class ExamsController extends Controller {
  constructor(req, res) {
    super(req, res);
  }

  async findAll() {
    try {
      const exams = await ExamModel.findAll();
      return this.success(exams);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi lấy danh sách kỳ thi.");
    }
  }

  async findOne() {
    const { id } = this.req.params; // Sử dụng req.params để lấy id từ đường dẫn

    if (!id) {
      return this.error("Cần phải có ID kỳ thi để tìm.");
    }

    try {
      const exam = await ExamModel.findOne({
        where: { id },
      });

      if (!exam) {
        return this.error("Kỳ thi không tồn tại.");
      }

      return this.success(exam);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi tìm kỳ thi.");
    }
  }

  async create() {
    const { name, classId, examDate } = this.req.body;

    if (!name || !classId || !examDate) {
      return this.error("Cần phải có tên kỳ thi, lớp học và ngày thi.");
    }

    try {
      const newExam = await ExamModel.create({ name, classId, examDate });
      return this.success(newExam);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi tạo kỳ thi.");
    }
  }

  async update() {
    const { id } = this.req.params; // Lấy id từ req.params (thay vì req.body)

    const { name, classId, examDate } = this.req.body;
    if (!id || !name || !classId || !examDate) {
      return this.error("Cần phải có ID, tên kỳ thi, lớp học và ngày thi.");
    }

    try {
      const exam = await ExamModel.findByPk(id);

      if (!exam) {
        return this.error("Kỳ thi không tồn tại.");
      }

      const updatedExam = await exam.update({ name, classId, examDate });
      return this.success(updatedExam);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi cập nhật kỳ thi.");
    }
  }

  async delete() {
    const { id } = this.req.params; // Lấy id từ req.params (thay vì req.body)

    if (!id) {
      return this.error("Cần phải có ID kỳ thi để xóa.");
    }

    try {
      const exam = await ExamModel.findByPk(id);
      if (!exam) {
        return this.error("Kỳ thi không tồn tại.");
      }

      await exam.destroy();
      return this.success("Kỳ thi đã được xóa thành công.");
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi xóa kỳ thi.");
    }
  }
}

module.exports = ExamsController;
