const Order = require("../models/orderModel"); // import order model from ordermodel to use it
const Product = require("../models/productModel"); // import productModel
const ErrorHandler = require("../utils/errorhandler"); // import errorhandler
const catchAsyncError = require("../middleware/catchAsyncError"); // to try catch block or

//create a new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    // with the help of destructuring we will take some data from body
    // this data we need to send from frontend to place a new order
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    })
});




// get single order details 
exports.getSingleOrderDetails = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("no order present", 404));
    }

    res.status(200).json({
        success: true,
        order
    })

});




// get logged in user orders
exports.myOrders = catchAsyncError(async (req, res, next) => {

    // all the order of a particular user 
    // here id of logged in user and user id in database will be checked
    const orders = await Order.find({ user: req.user._id }); // added a filter on user 

    if (!orders) {
        return next(new ErrorHandler("No order present", 404));
    }

    res.status(200).json({
        success: true,
        orders, 
    });

});

// get all orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {

    // all the order
    const orders = await Order.find();

    if (!orders) {
        return next(new ErrorHandler("No order present", 404));
    }

    let totalAmount = 0;

    // iterate on orders array and add totalPrice of each order into totalAmount
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });

});



// updateStock function
async function updateStock(id, quantity) {

    const product = Product.findById(id); // get the product

    product.stock -= quantity; // update product stock 

    await product.save({ validateBeforeSave: false });
}


// update order status
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {

    const order = await Order.find({ id: req.params.id });  //req.params.id is ID of the order

    if (!order) {
        return next(new ErrorHandler("No product found", 404));
    }
    
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Order delivered already", 400));
    }
    
    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (odr) => {
            await updateStock(odr.product, odr.quantity);
        });
    }

    order.orderStatus = req.body.status; // this req.body.status we will send from ourend

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });

});


// delete order - admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("no order present", 404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true,
    });

});

