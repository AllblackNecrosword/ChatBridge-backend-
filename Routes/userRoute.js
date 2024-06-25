const express = require("express");
const { registerUser, loginUser, getUser } = require("../Controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/getuser/:id",getUser);

module.exports = router;
