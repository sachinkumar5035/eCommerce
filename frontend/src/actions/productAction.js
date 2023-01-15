import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_REVIEW_REQUEST,
  CLEAR_ERRORS
} from "../constants/productConstant";


// TO FETCH DATA FROM DATABASE AND GIVE IT TO REDUCER currentPage is for pagination bu default it's 1
export const getProduct = (keyword = "", currentPage = 1, price = [0, 250000],category,ratings=0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    let linkURL = `/api/v1/products?${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if(category){
      linkURL = `/api/v1/products?${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }

    //Implementing seach module flow is to get data  search.js->product.js->productAction.js 
    const { data } = await axios.get(linkURL); // GIVE THE API CALL TO FETCH DATA 

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};



// get all products for admin
export const getAdminProducts = () => async (dispatch) => {

  try {
    dispatch({type:ADMIN_PRODUCT_REQUEST});
    const {data} = await axios.get("/api/v1/admin/products");
    dispatch({
      type:ADMIN_PRODUCT_SUCCESS,
      payload:data.products,
    })
  } catch (error) {
    dispatch({
      type:ADMIN_PRODUCT_FAIL,
      payload:error.response.data.message,
    })
  }

}


// TO GET PRODUCT DETAILS 
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    // id is product ID 
    const { data } = await axios.get(`/api/v1/product/${id}`); // MAKE A API CALL TO FETCH PRODUCT DETAILS

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product, // yaha pr data fetch hoga jo product reducer me send kr dege and we need to recieve this data in product reducer 
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const addNewReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    // id is product ID 
    const config={
      headers:{"Content-Type":"application/json"}
    }
    const { data } = await axios.put(`/api/v1/review`,review,config); // MAKE A API CALL TO FETCH PRODUCT DETAILS

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.success, // yaha pr data fetch hoga jo product reducer me send kr dege and we need to recieve this data in product reducer 
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};




// clear all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
