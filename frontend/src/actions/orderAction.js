import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

import axios from "axios";

// to create a new order 
export const createOrder = (order) => async (dispatch,getState)=>{

    try {
        dispatch({type:CREATE_ORDER_REQUEST})
        const config={
            headers:{
                "Content-Type":"application/json",
            }
        }
        const {data} = await axios.post("/api/v1/order/new",order,config); // to create a new order
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data});
    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message,
        })
    }


}


// clear all errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  