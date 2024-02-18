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
  NEW_PRODUCT__REQUEST,
  NEW_PRODUCT__SUCCESS,
  NEW_PRODUCT__FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_SUCCESS,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  NEW_REVIEW_FAIL
} from "../constants/productConstant";
// import axios from "axios";
// const baseAPI=new axios.create({baseURL:"http://192.168.0.100:4000"})



// TO FETCH DATA FROM DATABASE AND GIVE IT TO REDUCER currentPage is for pagination bu default it's 1
export const getProduct = (keyword = "", currentPage = 1, price = [0, 250000],category,ratings=0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    let linkURL = `http://192.168.0.100:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if(category){
      linkURL = `http://192.168.0.100:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }

    //Implementing search module flow is to get data  search.js->product.js->productAction.js 
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
    const {data} = await axios.get("http://192.168.0.100:4000/api/v1/admin/products");
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



// add a new product (ADMIN ROUTE)
export const addNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT__REQUEST });
    // id is product ID 
    const config={
      headers:{"Content-Type":"application/json"}
    }
    const { data } = await axios.post(`http://192.168.0.100:4000/api/v1/admin/product/new`,productData,config); // MAKE A API CALL TO FETCH PRODUCT DETAILS

    dispatch({
      type: NEW_PRODUCT__SUCCESS,
      payload: data, // in reducer we get data using action.payload.success and action.payload.product
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT__FAIL,
      payload: error.response.data.message,
    });
  }
}

// delete a product(ADMIN)
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    // id is product ID 
    const { data } = await axios.delete(`http://192.168.0.100:4000/api/v1/admin/product/${id}`); // MAKE A API CALL TO FETCH PRODUCT DETAILS

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success, // in reducer we get data using action.payload.success and action.payload.product
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}

// update product
export const updateProduct = (id,productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    // id is product ID 
    const config={
      headers:{"Content-Type":"application/json"}
    }
    const { data } = await axios.put(`http://192.168.0.100:4000/api/v1/admin/product/${id}`,productData,config); // MAKE A API CALL TO FETCH PRODUCT DETAILS

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success, // in reducer we get data using action.payload.success and action.payload.product
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}


// TO GET PRODUCT DETAILS 
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    // id is product ID 
    const { data } = await axios.get(`http://192.168.0.100:4000/api/v1/product/${id}`); // MAKE A API CALL TO FETCH PRODUCT DETAILS

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product, // yaha pr data fetch hoga jo product reducer me send kr dege and we need to receive this data in product reducer 
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};


// add a new review 
export const addNewReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    // id is product ID 
    const config={
      headers:{"Content-Type":"application/json"}
    }
    const { data } = await axios.put(`http://192.168.0.100:4000/api/v1/review`,review,config); // MAKE A API CALL TO FETCH PRODUCT DETAILS

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success, // yaha pr data fetch hoga jo product reducer me send kr dege and we need to receive this data in product reducer 
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all reviews of a product (admin)
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });
   
    const { data } = await axios.get(`http://192.168.0.100:4000/api/v1/reviews?id=${id}`); // MAKE A API CALL TO FETCH PRODUCT DETAILS

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews, // we will be receiving the data from backend as reviews and will send it to the reducer 
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//to delete a review of a product 
export const deleteReview = (reviewId,productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    
    const { data } = await axios.delete(`http://192.168.0.100:4000/api/v1/reviews?id=${reviewId}&productId=${productId}`); // MAKE A API CALL TO FETCH PRODUCT DETAILS

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success, // we will be recieing the data from backend as reviews and will send it to the reducer 
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


// clear all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
