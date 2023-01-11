const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncError = require("../middleware/catchAsyncError"); // to try catch block or



exports.processPayment = catchAsyncError(async (req, res, next) => {

    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currncy: "inr",
        metadata: {
            company: "ECommerce",
        },
    })

    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    })


})