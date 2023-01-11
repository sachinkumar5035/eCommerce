const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getReviewsOfProduct,
  deleteReview,
  getAdminProducts
} = require("../controller/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { route } = require("./userRoute");
const router = express.Router();

router.route("/products").get(getAllProducts); // this will be the get request to find all products of a user

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts); // admin can find all products
 


router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct); // to create a product, API

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct); // API to update a product

router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct); // delete the product

router.route("/product/:id").get(getProductDetails); // to get product details

router.route("/review").put(isAuthenticatedUser, createProductReview); // add or update review of a product

router.route("/reviews").get(getReviewsOfProduct); // dget review of a partivular product

router.route("/reviews").delete(isAuthenticatedUser, deleteReview); // delete review of a product


module.exports = router;
