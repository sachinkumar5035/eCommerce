const ErrorHandler = require("../utils/errorhandler"); // import errorhandler
const catchAsyncError = require("../middleware/catchAsyncError"); // to try catch block or
const axios = require("axios"); //


exports.verifyCaptcha = catchAsyncError(async (req, res, next) => {

    const {captchaValue} = req.body;
    const secretKey = process.env.V2_SECRET_KEY;
    const { data } = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaValue}`,
      )
    res.send(data);
});

