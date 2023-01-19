const ErrorHandler = require("../utils/errorhandler"); // import errorhandler 
const catchAsyncError = require("../middleware/catchAsyncError"); // to try catch block or
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { json } = require("body-parser");
const { use } = require("../routes/userRoute");
const cloudinary = require("cloudinary");


// register a user using API-> http://localhost:4000/api/v1/register 
exports.registerUser = catchAsyncError(async (req, res, next) => { // using catchAsync function to handle try and catch block

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const { name, email, password } = req.body; // destructuring

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id, // for image id 
            url: myCloud.secure_url, // for url of image
        }
    });

    sendToken(user, 201, res); // or can write below code for the same
    // const token = user.JWTToken();

    // res.status(201).json({
    //     success:true,
    //     token
    // })

});




// login user 
exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    // check user entered email and password or not
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password"); // unauthorised

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401)); // 
    }

    const isPasswordMatch = await user.comparePassword(password);

    // password is invalid
    if (!isPasswordMatch) {
        return next(new ErrorHandler("invalid email or password", 401));
    }

    // get the token if email and password is valid

    sendToken(user, 200, res);//

});




// logout method
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });

});



//forgot password in this function we are sending a mail to the user to reset password with the link 
exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("user not found", 404));
    }

    //get reset password token getResetPasswordToken from userModel 
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this please ignore it`;

    try {
        // this function in utils sendMail
        await sendEmail({
            email: user.email,
            subject: "eCommerce password recovery",
            message: message
        });
        res.status(200).json({
            success: true,
            message: `mail sent to ${user.email} successfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined; // resetPasswordToken userModel property
        user.resetPasswordExpire = undefined; //resetPasswordExpire userModel property
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

//resetPassword
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or expired", 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password did not match", 400));
    }
    else {
        // reset the password
        user.password = req.body.password;
        user.resetPasswordToken = undefined; // resetPasswordToken userModel property
        user.resetPasswordExpire = undefined; //resetPasswordExpire userModel property
        await user.save;
        // sendToken(user, 200, res);
        const token = user.getJWTToken();

        res.status(201).json({
            success: true,
            token,
            user,
        })
    }
});



// get user details  a user will fetch his or her details 
exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
});

// update userPassword
// from updatePassword.js we are sending three parameters to change password (oldPassword,newPassword,confirmPassword)
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    // password is invalid
    if (!isPasswordMatch) {
        return next(new ErrorHandler("old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.confirmPassword;

    await user.save();

    sendToken(user, 200, res);

    // or we can also write these line to send the token
    // res.status(200).json({
    //     success:true,
    //     user,
    // })

});



// update Profile of a user
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // need to add cloudinary later

    if (req.body.avatar != "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId); // old image will destroy 
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }

    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user,
    })

});


// get all user (admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
});


// get single user (admin)
exports.getSingleUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`No such user found with id: ${req.params.id} `));
    }


    res.status(200).json({
        success: true,
        user
    });

});


// update role of a user - admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    // need to add cloudinary later

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user,
    })

});



// delete a user -admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`No such user found with id: ${req.params.id} `));
    }
    //removing cloudenary
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success: true,
        user,
        message: "user deleted successfully"
    })

});