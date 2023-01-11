const express = require("express");
const { processPayment } = require("../controller/paymentController");
const router = express.Router();
const {isAuthenticatedUser} = require("../middleware/auth");




// route to process payment 
router.route("/payment/process").post(isAuthenticatedUser,processPayment); 


module.exports = router;