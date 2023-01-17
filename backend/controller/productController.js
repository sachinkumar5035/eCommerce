const Product = require("../models/productModel"); // import productModel
const ErrorHandler = require("../utils/errorhandler"); // import errorhandler
const catchAsyncError = require("../middleware/catchAsyncError"); // to try catch block or
const ApiFeatures = require("../utils/apiFeatures"); // to implement search
const cloudinary = require("cloudinary"); // to upload images 



// to create a product API-> http://localhost:4000/api/v1/product/new
exports.createProduct = catchAsyncError(async (req, res, next) => {

    let images = [];
    if (typeof req.body.images === "string") { // for one image(from frontend only one URL sent)
        images.push(req.body.images);
    }
    else {
        images = req.body.images; // fontend image array is equal to images array 
    }

    const imagesLinks = [];

    for (let index = 0; index < images.length; index++) {
        // const image = images[index];
        const result = await cloudinary.v2.uploader.upload(images[index], {
            folder: "products", // cloudinary me products folder me images upload hogi
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        })

    }

    req.body.images = imagesLinks; // images will contain cloudinary images link
    req.body.user = req.user.id;



    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});


// get all products -- Route API-> http://localhost:4000/api/v1/products
exports.getAllProducts = catchAsyncError(async (req, res, next) => {


    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter().pagination(resultPerPage);

    const products = await apiFeature.query;

    // let products = await apiFeature.query;

    // let filteredProductsCount = products.length;

    // apiFeature.pagination(resultPerPage);

    // products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount, // ye name and const{product,loading,error,productsCount} me name same hona chahiye otherwise we will get the error 
        resultPerPage,
        // filteredProductsCount,
    });

});


// Get All Product (Admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});


// update product API-> http://localhost:4000/api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    // here next is a callback function
    if (!product) {
        //calling constructor of errorhandler passing message and statuscode as arguments
        return next(new ErrorHandler("Product not found", 404));
    }

    let images = [];
    if (typeof req.body.images === "string") { // for one image(from frontend only one URL sent)
        images.push(req.body.images);
    }
    else {
        images = req.body.images; // fontend image array is equal to images array 
    }

    if (images !== undefined) {
        // deleting images from cloudinary
        for (let index; index < product.images.length; index++) {
            await cloudinary.v2.uploader.destroy(product.images[index].public_id);
        }

        const imagesLinks = [];

        for (let index = 0; index < images.length; index++) {
            const result = await cloudinary.v2.uploader.upload(images[index], {
                folder: "products", // cloudinary me products folder me images upload hogi
            })

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            })
            req.body.images = imagesLinks;
        }
    }




    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        // return the product which we found
        product,
    });
});



// delete a product -- admin API-> http://localhost:4000/api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    // product not found
    if (!product) {
        //calling constructor of errorhandler passing message and statuscode as arguments
        return next(new ErrorHandler("Product not found", 404));
    }

    // deleting images from cloudinary
    for (let index; index < product.images.length; index++) {
        await cloudinary.v2.uploader.destroy(product.images[index].public_id);
    }

    // removing the product from the DB
    await product.remove();

    // sending the response
    return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});





// get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })

        //calling constructor of errorhandler passing message and statuscode as arguments
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        // return product which we found
        product,
        // productCount // count of product
    });
});





// create product review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    // created a new review object
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    //find the product to which review is going to added
    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler("no product found"));
    }

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    // already reviewed
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            // check if same user is reviewing it
            if (rev.user.toString() === req.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment);
            }
        });
    }
    // not reviewed already
    else {
        // add this new review object at the end of the reviews array of this product
        product.reviews.push(review);
        product.NumberOfReviews = product.reviews.length;
    }

    let avgRating = 0;
    // get the average of a product

    product.reviews.forEach((rev) => {
        avgRating += rev.rating;
    });

    product.ratings = avgRating / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        product,
    });
});





// get all reviews of a product
exports.getReviewsOfProduct = catchAsyncError(async (req, res, next) => {
    // yaha pr
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});





// delete review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    //yaha pr product ID send ki h API me
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    //reviews me vo sare reviews hoge jo delete nhi krne h
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    //rating will also get change

    let avgRating = 0;
    // get the average of a product

    reviews.forEach((rev) => {
        avgRating += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avgRating / reviews.length;
    }

    const NumberOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            NumberOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });

});
