const express  = require("express");
const { registerAdmin , loginAdmin , currentAdmin } = require("../controllers/adminController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register",registerAdmin);

router.post("/login",loginAdmin);

router.get("/current",validateToken ,currentAdmin);

module.exports = router;