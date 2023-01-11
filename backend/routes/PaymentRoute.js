const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");
const router = express.Router();
const {isAuthenticatedUser} = require("../middleware/auth");




// route to process payment 
router.route("/payment/process").post(isAuthenticatedUser,processPayment); 

// send stripe API key 
router.route("/stripeapikey").get(isAuthenticatedUser,sendStripeApiKey); 

module.exports = router;