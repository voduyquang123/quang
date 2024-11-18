const Controller = require("./Controller");
const EnrollmentModel = require("../models/EnrollmentsModel");

class EnrollmentsController extends Controller {
  constructor(req, res) {
    super(req, res);
  }
  async findAll() {
    try {
      const enrollments = await EnrollmentModel.findAll();
      return this.success(enrollments);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi lấy danh sách đăng ký.");
    }
  }

  async findOne() {
    const { enrollmentId } = this.req.params;

    if (!enrollmentId) {
      return this.error("Cần phải có ID đăng ký môn học.");
    }

    try {
      const enrollment = await EnrollmentModel.findOne({
        where: { id: enrollmentId },
      });

      if (!enrollment) {
        return this.error("Không tìm thấy đăng ký môn học.");
      }

      return this.success(enrollment);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi lấy thông tin đăng ký.");
    }
  }

  async create() {
    const { studentId, subjectId, classId } = this.req.body;

    if (!studentId || !subjectId || !classId) {
      return this.error(
        "Thông tin học sinh, môn học và lớp học không được rỗng."
      );
    }

    try {
      const newEnrollment = await EnrollmentModel.create({
        studentId,
        subjectId,
        classId,
      });
      return this.success(newEnrollment);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi tạo đăng ký.");
    }
  }

  async update() {
    const { enrollmentId, subjectId, classId } = this.req.body;

    if (!enrollmentId || !subjectId || !classId) {
      return this.error("Cần phải có ID đăng ký, môn học và lớp học.");
    }

    try {
      const updatedEnrollment = await EnrollmentModel.update(
        { subjectId, classId },
        { where: { id: enrollmentId } }
      );

      if (updatedEnrollment[0] === 0) {
        return this.error("Không tìm thấy đăng ký môn học cần cập nhật.");
      }

      return this.success("Cập nhật đăng ký môn học thành công.");
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi cập nhật đăng ký.");
    }
  }

  async delete() {
    const { enrollmentId } = this.req.body;

    if (!enrollmentId) {
      return this.error("Cần phải có ID đăng ký môn học để xóa.");
    }

    try {
      const deleted = await EnrollmentModel.destroy({
        where: { id: enrollmentId },
      });

      if (deleted === 0) {
        return this.error("Không tìm thấy đăng ký môn học cần xóa.");
      }

      return this.success("Xóa đăng ký môn học thành công.");
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi xóa đăng ký.");
    }
  }
}

module.exports = EnrollmentsController;
