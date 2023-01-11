const express = require("express");
const { newOrder, myOrders, getSingleOrder, getAllOrders, deleteOrder, updateOrderStatus } = require("../controller/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


// all routes here
router.route("/order/new").post(isAuthenticatedUser, newOrder); // create a new order

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder); // single order details

router.route("/orders/me").get(isAuthenticatedUser, myOrders); // get all orders of a user

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders); // admin can access all the orders - admin

router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus); // admin can update status of order - admin

router.route("/admin/order/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder); // delete the order - admin



module.exports = router;