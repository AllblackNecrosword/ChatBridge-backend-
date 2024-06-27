const express = require("express");
const { getMessage, sentMessage } = require("../Controllers/messageController");
const router = express.Router();

router.get("/getMessage", getMessage);
router.post("/setMessage", sentMessage);


module.exports = router;
