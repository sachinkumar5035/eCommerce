import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails, clearErrors, addNewReview } from "../../actions/productAction"; // to fetch productDetails from database
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemToCart } from "../../actions/cartAction";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";

// in backend we have req.params.id but in frontend we have match.params.id
const ProductDetails = ({ match }) => {

    const params = useParams(); // while match was not working
    const alert = useAlert();
    const dispatch = useDispatch();
    // const keyword = params.keyword;
    // fetch data from store
    const { error: reviewError, success } = useSelector((state) => state.newReview); // pulling success and error from newReview store
    // const { user, isAuthenticated } = useSelector((state) => state.user); // validation for submit review for a product  
    const { product, loading, error } = useSelector((state) => state.productDetails); // here name of store and state.nameOfParameter should be matched
   
    const options = {
        // size: "large",
        value: product.ratings,
        precision: .5,
        readOnly: true,
    };

    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    const reviewSubmitHandler = () => {
        console.log(product._id); // id is not getting
       
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", params.id);
        dispatch(addNewReview(myForm));
        setOpen(false);
    }


    const decreaseQuantity = () => {
        if (quantity > 1)
            setQuantity(quantity - 1);
        else {
            alert.error("quantity can not be less than 1");
        }
    }

    const increaseQuantity = () => {
        if (quantity < product.stock)
            setQuantity(quantity + 1);
        else {
            alert.error("Quantity can not be more than stock value");
        }
    }


    const addTOcarthandler = () => {
        dispatch(addItemToCart(params.id, quantity));
        alert.success("items added to cart successfully");
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id, error, alert, success, reviewError]);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={`${product.name} -- ECOMMERCE`} />
                    <div className="ProductDetails">
                        {/* Left div for carousel */}
                        <div >
                            <Carousel >
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>

                        {/* left div end */}
                        {/* right div */}
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>{product._id}</p>
                            </div>

                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span>({product.NumberOfReviews} Reviews)</span>
                            </div>

                            <div className="detailsBlock-3">
                                <h1>Price: ₹ {product.price}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity} >-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{" "}
                                    <button onClick={addTOcarthandler}>Add to cart</button>
                                </div>
                                <p>
                                    Status:{" "}
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">Submit review</button>
                        </div>
                        {/* right div end  */}
                    </div>


                    <h3 className="reviewsHeading">Reviews</h3>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews.map((review) => (
                                <ReviewCard key={review._id} review={review} /> // here we are sending review in ReviewCard need to recieve it as it is
                            ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews yet</p>
                    )}
                </Fragment>)}
        </Fragment>
    );
};

export default ProductDetails;
