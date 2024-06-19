const express = require("express");
const { tryout } = require("../Controllers/userController");
const router = express.Router();

router.get("/tryout", tryout);

module.exports = router;
