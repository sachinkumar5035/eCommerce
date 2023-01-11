import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstant";


// to get products from database
export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [], // empty array of products
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        // all these value will be accesible in home.js using destructuring
        loading: false,
        products: action.payload.products, // return the array of products
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        // filteredProductsCount:action.payload.filteredProductsCount,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state, // return the current state
        error: null,
      };
    default:
      return state; // return current state
  }
};




// to get product details from database
export const productDetailsReducer = (state = { product:{} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        // all these value will be accesible in home.js using destructuring
        loading: false,
        product: action.payload, // get the product details from productAction 
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state, // return the current state
        error: null,
      };
    default:
      return state; // return current state
  }
};




