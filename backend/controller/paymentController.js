const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncError = require("../middleware/catchAsyncError"); // to try catch block or


// to complete payment
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




// send api key to frontend 
exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY});
})