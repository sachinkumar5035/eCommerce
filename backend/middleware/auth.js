const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;
    // console.log("token inside is authentication ",token);
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401)); // unauthorized access
    } 

    const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodeData.id);
    next(); // to execute the next function

});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource `,
                    403
                )
            );
        }

        next();
    };
};
