const Controller = require("./Controller");
const AttendanceModel = require("../models/AttendanceModel");

class AttendanceController extends Controller {
  constructor(req, res) {
    super(req, res);
  }

  // Lấy danh sách điểm danh của tất cả học sinh, bao gồm thông tin giáo viên
  async findAll() {
    try {
      const attendances = await AttendanceModel.findAll({
        include: [
          { model: User, as: "student", attributes: ["id", "name"] }, // Thông tin học sinh
          { model: User, as: "teacher", attributes: ["id", "name"] }, // Thông tin giáo viên
        ],
      });
      return this.success(attendances);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi lấy danh sách điểm danh.", error);
    }
  }

  // Lấy điểm danh của một học sinh trong một lớp
  async findOne() {
    const { studentId, classId } = this.req.params;

    if (!studentId || !classId) {
      return this.error("Cần phải có thông tin học sinh và lớp học.");
    }

    try {
      const attendance = await AttendanceModel.findOne({
        where: { studentId, classId },
        include: [
          { model: User, as: "student", attributes: ["id", "name"] }, // Thông tin học sinh
          { model: User, as: "teacher", attributes: ["id", "name"] }, // Thông tin giáo viên
        ],
      });

      if (!attendance) {
        return this.error("Không tìm thấy bản ghi điểm danh.");
      }

      return this.success(attendance);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi lấy điểm danh.", error);
    }
  }

  // Tạo điểm danh cho học sinh
  async create() {
    const { studentId, classId, status } = this.req.body;
    const userId = this.req.user.data.id; // userID của giáo viên từ yêu cầu

    if (!studentId || !classId || !status) {
      return this.error(
        "Cần phải có thông tin học sinh, lớp học và trạng thái."
      );
    }

    try {
      const newAttendance = await AttendanceModel.create({
        studentId,
        classId,
        status,
        userID: userId, // Lưu lại userID khi tạo bản ghi
      });
      return this.success(newAttendance);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi thêm điểm danh.", error);
    }
  }

  // Cập nhật điểm danh
  async update() {
    const { studentId, classId, status } = this.req.body;

    if (!studentId || !classId || !status) {
      return this.error(
        "Cần phải có thông tin học sinh, lớp học và trạng thái."
      );
    }

    try {
      const attendance = await AttendanceModel.findOne({
        where: { studentId, classId },
      });

      if (!attendance) {
        return this.error("Không tìm thấy bản ghi điểm danh của học sinh này.");
      }

      attendance.status = status;
      await attendance.save();

      return this.success(attendance);
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi cập nhật điểm danh.", error);
    }
  }

  // Xóa điểm danh
  async delete() {
    const { studentId, classId } = this.req.body;

    if (!studentId || !classId) {
      return this.error("Cần phải có thông tin học sinh và lớp học.");
    }

    try {
      const attendance = await AttendanceModel.findOne({
        where: { studentId, classId },
      });

      if (!attendance) {
        return this.error("Không tìm thấy bản ghi điểm danh của học sinh này.");
      }

      await attendance.destroy();

      return this.success("Bản ghi điểm danh đã được xóa thành công.");
    } catch (error) {
      return this.error("Đã xảy ra lỗi khi xóa điểm danh.", error);
    }
  }
}

module.exports = AttendanceController;
