const express = require("express");
const router = express.Router();

const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");
const ClassesController = require("./controllers/ClassesController");
const AttendanceController = require("./controllers/AttendanceController");
const StudentController = require("./controllers/StudentController");
const EnrollmentsController = require("./controllers/EnrollmentsController");
const ExamsController = require("./controllers/ExamsController");
const GradesController = require("./controllers/GradesController");

router.get(
  "/user/findAll",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new UserController(req, res).findAll()
);
router.get(
  "/user/findOne/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new UserController(req, res).findOne(req.params.id)
);
router.post(
  "/user/create",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new UserController(req, res).create()
);
router.post(
  "/user/update/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new UserController(req, res).update(req.params.id)
);
router.delete(
  "/user/delete/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new UserController(req, res).delete(req.params.id)
);

// router auth
router.post("/auth/login", (req, res) => new AuthController(req, res).login());
router.post("/auth/logout", (req, res) =>
  new AuthController(req, res).logout()
);

// router cho clases
router.get(
  "/class/findAll",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new ClassesController(req, res).findAll()
);

router.get(
  "/class/findOne/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new ClassesController(req, res).findOne()
);

router.post(
  "/class/create",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new ClassesController(req, res).create()
);

router.put(
  "/class/update/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new ClassesController(req, res).update(req.params.id)
);

router.delete(
  "/class/delete/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new ClassesController(req, res).delete(req.params.id)
);

//router cho Attendance : điểm danh

router.get(
  "/attendance/findAll",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new AttendanceController(req, res).findAll()
);

router.get(
  "/attendance/findOne/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new AttendanceController(req, res).findOne()
);

router.post(
  "/attendance/create",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new AttendanceController(req, res).create()
);
router.put(
  "/attendance/update/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new AttendanceController(req, res).update(req.params.id)
);
router.delete(
  "/attendance/detele/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new AttendanceController(req, res).delete(req.params.id)
);

// router cho student
router.get(
  "/students/findAll",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new StudentController(req, res).findAll()
);

router.get(
  "/students/findOne/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new StudentController(req, res).findOne(req.params.id)
);

router.post(
  "/students/create",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new StudentController(req, res).create()
);

router.put(
  "/students/update/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new StudentController(req, res).update(req.params.id)
);

router.delete(
  "/students/delete/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new StudentController(req, res).delete(req.params.id)
);

//router cho Enrollments
router.get(
  "/enrollments/findAll",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new EnrollmentsController(req, res).findAll()
);

router.get(
  "/enrollments/findOne/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new EnrollmentsController(req, res).findOne()
);

router.post(
  "/enrollments/create",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new EnrollmentsController(req, res).create()
);

router.put(
  "/enrollments/update/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new EnrollmentsController(req, res).update()
);

router.delete(
  "/enrollments/delete/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new EnrollmentsController(req, res).delete(req.params.id)
);

//router cho exam
router.get(
  "/exam/findAll/",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new ExamsController(req, res).findAll()
);

router.get(
  "/exam/findOne/:id/", // id nằm trong URL params
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new ExamsController(req, res).findOne(req.params.id)
);

router.post(
  "/exam/create",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new ExamsController(req, res).create()
);

router.put(
  "/exam/update/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new ExamsController(req, res).update(req.params.id)
);

router.delete(
  "/exam/delete/:id",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new ExamsController(req, res).delete(req.params.id)
);

//router cho diem
router.get(
  "/grade/findAll",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new GradesController(req, res).findAll()
);

router.get(
  "/grade/findOne/:gradeId",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new GradesController(req, res).findOne(req.params.gradeId)
);

router.post(
  "/grade/create",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new GradesController(req, res).create()
);

router.put(
  "/grade/update/:gradeId",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new GradesController(req, res).update(req.params.gradeId)
);

router.delete(
  "/grade/delete/:gradeId",
  (req, res, next) => new AuthController(req, res, next).authentication(),
  (req, res) => new GradesController(req, res).delete(req.params.gradeId)
);
module.exports = router;
