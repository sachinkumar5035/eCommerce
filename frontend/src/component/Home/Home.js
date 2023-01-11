import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
// useSelector and useSelector will need to call getProducts
import {useAlert} from "react-alert";


// const product = {
//   name:"T-shirt",
//   images:[{url:"http://image.png"}],
//   price:"1000",
//   _id:"1r2ty8980"
// }

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]); // whenever error got change than alert will be shown

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to ECOMMERCE</p>
            <h1>Find amazing products with best quality</h1>
            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>
          <h2 className="homeHeading">Freatured products</h2>
          <div className="container" id="container">
            {products && products.map((product) => (<ProductCard key={product._id} product={product} />))}
            {/* <Product product={product}/> */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
