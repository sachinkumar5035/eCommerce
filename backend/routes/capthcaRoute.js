const express = require("express");
const { verifyCaptcha } = require("../controller/captchaController");



const router = express.Router();

router.route("/verify").post(verifyCaptcha);

module.exports = router;    