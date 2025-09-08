const express = require("express");
const authController = require("./../controller/auth");

const router = express.Router();

router.post("/sms/send", authController.sendOtp);
router.post("/sms/verify", authController.verifyOtp);

module.exports = router;
