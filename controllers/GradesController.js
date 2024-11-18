// const Controller = require("./Controller");
// const GradesModel = require("../models/GradesModel");
// const StudentModel = require("../models/StudentModel");
// const ExamModel = require("../models/ExamModel");

// class GradesController extends Controller {
//   constructor(req, res) {
//     super(req, res);
//   }
//   async findAll() {
//     try {
//       const grades = await GradeModel.findAll({
//         include: [
//           {
//             model: StudentModel,
//             attributes: ["id", "name"],
//           },
//           {
//             model: ExamModel,
//             attributes: ["id", "name", "examDate"],
//           },
//         ],
//       });
//       return this.success(grades);
//     } catch (error) {
//       console.error(error);
//       return this.error("Đã xảy ra lỗi khi lấy danh sách điểm.");
//     }
//   }

//   // Lấy điểm theo ID
//   async findOne() {
//     const { gradeId } = this.req.params;

//     if (!gradeId) {
//       return this.error("Cần phải có ID điểm số để tìm.");
//     }

//     try {
//       const grade = await GradeModel.findOne({
//         where: { id: gradeId },
//         include: [
//           {
//             model: StudentModel,
//             attributes: ["id", "name"],
//           },
//           {
//             model: ExamModel,
//             attributes: ["id", "name", "examDate"],
//           },
//         ],
//       });

//       if (!grade) {
//         return this.error("Không tìm thấy điểm số.");
//       }

//       return this.success(grade);
//     } catch (error) {
//       console.error(error);
//       return this.error("Đã xảy ra lỗi khi lấy điểm số.");
//     }
//   }

//   async create() {
//     const { studentId, examId, grade } = this.req.body;

//     if (!studentId || !examId || grade === undefined) {
//       return this.error("Cần phải có thông tin học sinh, kỳ thi và điểm.");
//     }

//     try {
//       const student = await StudentModel.findByPk(studentId);
//       if (!student) {
//         return this.error("Học sinh không tồn tại.");
//       }

//       // Kiểm tra kỳ thi
//       const exam = await ExamModel.findByPk(examId);
//       if (!exam) {
//         return this.error("Kỳ thi không tồn tại.");
//       }

//       // Tạo điểm mới
//       const newGrade = await GradeModel.create({ studentId, examId, grade });
//       return this.success(newGrade);
//     } catch (error) {
//       console.error(error);
//       return this.error("Đã xảy ra lỗi khi thêm điểm.");
//     }
//   }

//   // Cập nhật điểm
//   async update() {
//     const { gradeId } = this.req.params;
//     const { grade } = this.req.body;

//     if (!gradeId || grade === undefined) {
//       return this.error("Cần phải có ID điểm số và điểm mới.");
//     }

//     try {
//       const gradeToUpdate = await GradeModel.findByPk(gradeId);
//       if (!gradeToUpdate) {
//         return this.error("Không tìm thấy điểm số cần cập nhật.");
//       }

//       await gradeToUpdate.update({ grade });
//       return this.success("Cập nhật điểm số thành công.");
//     } catch (error) {
//       console.error(error);
//       return this.error("Đã xảy ra lỗi khi cập nhật điểm.");
//     }
//   }

//   // Xóa điểm
//   async delete() {
//     const { gradeId } = this.req.params;
//     if (!gradeId) {
//       return this.error("Cần phải có ID điểm số để xóa.");
//     }

//     try {
//       const gradeToDelete = await GradeModel.findByPk(gradeId);
//       if (!gradeToDelete) {
//         return this.error("Không tìm thấy điểm số cần xóa.");
//       }

//       await gradeToDelete.destroy();
//       return this.success("Xóa điểm số thành công.");
//     } catch (error) {
//       console.error(error);
//       return this.error("Đã xảy ra lỗi khi xóa điểm.");
//     }
//   }
// }

// module.exports = GradesController;
const Controller = require("./Controller");
const GradeModel = require("../models/GradesModel");
const StudentModel = require("../models/StudentModel");
const ExamModel = require("../models/ExamModel");

class GradesController extends Controller {
  constructor(req, res) {
    super(req, res);
  }

  async findAll() {
    try {
      const grades = await GradeModel.findAll();
      return this.success(grades);
    } catch (error) {
      console.error(error); // Log lỗi để dễ debug
      return this.error("Đã xảy ra lỗi khi lấy danh sách điểm.");
    }
  }

  async findOne() {
    const { gradeId } = this.req.params;

    if (!gradeId) {
      return this.error("Cần phải có ID điểm số để tìm.");
    }

    try {
      const grade = await GradeModel.findOne({ where: { id: gradeId } });

      if (!grade) {
        return this.error("Không tìm thấy điểm số.");
      }

      return this.success(grade);
    } catch (error) {
      console.error(error); // Log lỗi để dễ debug
      return this.error("Đã xảy ra lỗi khi lấy điểm số.");
    }
  }

  // Tạo điểm mới
  async create() {
    const { studentId, examId, grade } = this.req.body;
    if (!studentId || !examId || grade === undefined) {
      return this.error("Cần phải có thông tin học sinh, kỳ thi và điểm.");
    }

    try {
      // Kiểm tra học sinh có tồn tại không
      const student = await StudentModel.findByPk(studentId);
      if (!student) {
        return this.error("Học sinh không tồn tại.");
      }

      // Kiểm tra kỳ thi có tồn tại không
      const exam = await ExamModel.findByPk(examId);
      if (!exam) {
        return this.error("Kỳ thi không tồn tại.");
      }

      // Kiểm tra nếu điểm đã tồn tại
      const existingGrade = await GradeModel.findOne({
        where: { studentId, examId },
      });
      if (existingGrade) {
        return this.error("Học sinh đã có điểm cho kỳ thi này.");
      }

      // Tạo mới điểm
      const newGrade = await GradeModel.create({ studentId, examId, grade });
      return this.success(newGrade);
    } catch (error) {
      console.error(error); // Log lỗi để dễ debug
      return this.error("Đã xảy ra lỗi khi thêm điểm.");
    }
  }

  // Cập nhật điểm
  async update() {
    const { gradeId } = this.req.params;
    const { grade } = this.req.body;

    if (!gradeId || grade === undefined) {
      return this.error("Cần phải có ID điểm số và điểm mới.");
    }

    try {
      const gradeToUpdate = await GradeModel.findByPk(gradeId);
      if (!gradeToUpdate) {
        return this.error("Không tìm thấy điểm số cần cập nhật.");
      }

      await gradeToUpdate.update({ grade });
      return this.success("Cập nhật điểm số thành công.");
    } catch (error) {
      console.error(error); // Log lỗi để dễ debug
      return this.error("Đã xảy ra lỗi khi cập nhật điểm.");
    }
  }

  // Xóa điểm
  async delete() {
    const { gradeId } = this.req.params;
    if (!gradeId) {
      return this.error("Cần phải có ID điểm số để xóa.");
    }

    try {
      const gradeToDelete = await GradeModel.findByPk(gradeId);
      if (!gradeToDelete) {
        return this.error("Không tìm thấy điểm số cần xóa.");
      }

      await gradeToDelete.destroy();
      return this.success("Xóa điểm số thành công.");
    } catch (error) {
      console.error(error); // Log lỗi để dễ debug
      return this.error("Đã xảy ra lỗi khi xóa điểm.");
    }
  }
}

module.exports = GradesController;
