const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUser,
  getSingleUserDetails,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser); // to register a new user

router.route("/login").post(loginUser); // to login user

router.route("/password/forgot").post(forgotPassword); // forgot password

router.route("/password/reset/:token").put(resetPassword); // reset password

router.route("/logout").get(logoutUser); // to logout user

router.route("/me").get(isAuthenticatedUser, getUserDetails); // a user will fetch his/her details

router.route("/password/update").put(isAuthenticatedUser, updateUserPassword); // update user password after validating user is

router.route("/me/update").put(isAuthenticatedUser, updateUserProfile); // user profile update

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser); // get all user (admin)

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUserDetails); // admin can access a single user details -admin

router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole); // to update a role of a user- admin

router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser); // delete a user- admin


module.exports = router;
