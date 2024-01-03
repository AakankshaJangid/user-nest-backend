const express = require("express");
const { getUsers, createUser, getUser, editUser, deleteUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);

router.route("/").get(getUsers).post(createUser)

router.route("/:id").get(getUser).put(editUser).delete(deleteUser)


module.exports = router;