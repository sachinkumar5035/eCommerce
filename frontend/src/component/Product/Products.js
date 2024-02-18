import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Metadata from "../layout/MetaData";
import { useAlert } from "react-alert"



const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphone",
];

const Products = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1); // initial state is always 1
    const [price, setPrice] = useState([0, 250000]); // for price slider
    const params = useParams();
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0); // show all the product above 0 ratings
    const alert = useAlert();
    // getting it for search functionality -> send it in productAction -> get data using axios.get
    const keyword = params.keyword;
    const dispatch = useDispatch();
    const { loading, error, products, productsCount, resultPerPage } =
        useSelector((state) => state.products); // will return products from getAllProducts from productController

    // set the current page number
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings)); // for pagination and search module
    }, [dispatch, keyword, currentPage, price, category, ratings,alert,error]);

    return (
        <Fragment>
            <Metadata title="Products - ECOMMERCE" />
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <h1 className="productsHeading">Products</h1>
                    <div className="products" id="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>

                    {/* price filter slider using material UI */}
                    <div className="filterBox">
                        {/* price filter */}
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            // if valueLabelDisplay is "on" then slider price will be always
                            valueLabelDisplay="auto"
                            // range-slider is price range can be select by sliding
                            aria-labelledby="range-slider"
                            min={0}
                            max={250000}
                        />
                        {/* price filter slider end  */}

                        {/* category filter */}
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                        {/* end category slider */}

                        {/* rating filter start */}
                        <fieldset>
                            <Typography component="legend">Ratings above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                min={0}
                                max={5}
                                valueLabelDisplay="auto"
                            />
                        </fieldset>
                        {/* rating filter end */}
                    </div>

                    {/* pagination condition is for showing pagination if resultperPage is lessthan total products */}
                    {resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                    {/* pagination end */}
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;
