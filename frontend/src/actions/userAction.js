import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    CLEAR_ERRORS
    
} from "../constants/userConstants";
import axios from "axios";


// for login purpose
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { heaeder: { "Content-Type": "application/json" } };

        const {data} = await axios.post(`/api/v1/login`, { email, password }, config); // api for login a user

        dispatch({type:LOGIN_SUCCESS,
            payload:data.user
        });

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};


// for register purpose
// here userData is formData in loginsignUp.js page
export const register = (userData)=> async (dispatch)=>{

    try {
        dispatch({type:REGISTER_USER_REQUEST});

        const config = { headers : { "Content-Type": "multipart/form-data" } };

        const {data} = await axios.post(`/api/v1/register`, userData, config); // api for login a user

        dispatch({type:REGISTER_USER_SUCCESS,
            payload:data.user
        });

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// load user after login and register
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        // get user profile API 
        const {data} = await axios.get(`/api/v1/me`); // api for login a user details 

        dispatch({type:LOAD_USER_SUCCESS,
            payload:data.user
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// logout user
export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        await axios.get(`/api/v1/logout`); // api for logout a user 

        dispatch({type:LOGOUT_SUCCESS});

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};


// update user profile
export const updateProfile = (userData)=> async (dispatch)=>{

    try {
        dispatch({type:UPDATE_PROFILE_REQUEST});

        const config = { headers : { "Content-Type": "multipart/form-data" } };

        const {data} = await axios.put(`/api/v1/me/update`, userData, config); // api for update profile check in userRoute.js

        dispatch({type:UPDATE_PROFILE_SUCCESS,
            payload:data.success
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};


// update user password
export const updatePassword = (password)=> async (dispatch)=>{

    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST});

        const config = { headers : { "Content-Type": "application/json" } };

        const {data} = await axios.put(`/api/v1/password/update`, password, config); // api for update profile check in userRoute.js

        dispatch({type:UPDATE_PASSWORD_SUCCESS,
            payload:data.success
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};


// forgot password 
export const forgotPassword = (email)=> async (dispatch)=>{

    try {
        dispatch({type:FORGOT_PASSWORD_REQUEST});

        const config = { headers : { "Content-Type": "application/json" } };

        const {data} = await axios.post(`/api/v1/password/forgot`, email, config); // api for forgot password check in userRoute.js

        dispatch({type:FORGOT_PASSWORD_SUCCESS,
            payload:data.message
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};



// reset password 
export const resetPassword = (token,passwords)=> async (dispatch)=>{

    try {
        dispatch({type:RESET_PASSWORD_REQUEST});

        const config = { headers : { "Content-Type": "application/json" } };

        const {data} = await axios.put(`/api/v1/password/reset/${token}`, passwords, config); // api for reset password check in userRoute.js

        dispatch({type:RESET_PASSWORD_SUCCESS,
            payload:data.success // we are sending payload as success from reducer 
        });

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};


// get all users (admin)
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });

        // get all user API 
        const {data} = await axios.get(`/api/v1/admin/users`); // api to fetch all users 

        dispatch({type:ALL_USERS_SUCCESS,
            payload:data.users, // in reducer we are fetching the users
        });

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// get user details (admin)
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        // get user details API 
        const {data} = await axios.get(`/api/v1/admin/user/${id}`); // api to fetch user details 

        dispatch({type:USER_DETAILS_SUCCESS,
            payload:data.user, // in reducer we are fetching the user
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// update user(admin)
export const updateUser = (id,userData)=> async (dispatch)=>{

    try {
        dispatch({type:UPDATE_USER_REQUEST});

        const config = { headers : { "Content-Type": "application/json" } };

        const {data} = await axios.put(`/api/v1/admin/user/${id}`, userData, config); // api for update profile check in userRoute.js

        dispatch({type:UPDATE_USER_SUCCESS,
            payload:data.success, // will get it as isUpdated in reducer 
        });

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// delete user(admin)
export const deleteUser = (id)=> async (dispatch)=>{

    try {
        dispatch({type:DELETE_USER_REQUEST});

        const {data} = await axios.delete(`/api/v1/admin/user/${id}`); // api for update profile check in userRoute.js

        dispatch({type:DELETE_USER_SUCCESS,
            payload:data
        });

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// clear all errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };