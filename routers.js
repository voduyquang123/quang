const express = require("express");
const router = express.Router();

const UserController = require("./controllers/UserController");

router.get("/user/finAll", (req, res) => new UserController(req, res).finAll());

router.get("/user/finOne/:id", (req, res) =>
  new UserController(req, res).finOne(req.params.id)
);

router.post("/user/create", (req, res) =>
  new UserController(req, res).create()
);

router.put("/user/update/:id", (req, res) =>
  new UserController(req, res).update(req.params.id)
);

router.delete("/user/delete/:id", (req, res) =>
  new UserController(req, res).delete(req.params.id)
);

// Export router
module.exports = router;
