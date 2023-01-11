import React, { Fragment, useEffect, useState } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";



const ResetPassword = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading,success } = useSelector((state) => state.forgotPassword); // forgot password state me se pull kr lege
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    // in userController to change password we need to send three parameter to change the password 
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(params.token,myForm)); // myform is passing as userdata to updatePassword function in userAction.js file
    };

    useEffect(() => {
        
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password updated successfully");
            navigate(`/login`);
        }
    }, [dispatch, error, alert, navigate, success])


    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                <MetaData title="Reset Password -- ECOMMERCE" />
                <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                        <h1 className="resetPasswordHeading">Update Password</h1>
                        {/* resetPassword form start */}
                        <form
                            className="resetPasswordForm"
                            onSubmit={resetPasswordSubmit}
                            encType="multipart/form-data"
                        >
                            <div >
                                {/* <p>Password</p> */}
                                <LockOpenIcon/>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <div >
                                {/* <p>Password</p> */}
                                <LockIcon/>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    name="password"
                                    value={confirmPassword}
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <input type="submit" value="Update" className="resetPasswordBtn" />
                        </form>
                        {/* resetPassword form end */}
                    </div>
                </div>
            </Fragment>)}
        </Fragment>
    )
}

export default ResetPassword
