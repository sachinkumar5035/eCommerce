import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, isUpdated } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    // in userController to change password we need to send three parameter to change the password 
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm)); // myform is passing as userdata to updatePassword function in userAction.js file
    };

    useEffect(() => {
        
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile updated successfully");
            navigate(`/account`);
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }
    }, [dispatch, error, alert, navigate, isUpdated])


    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                <MetaData title="Change Password -- ECOMMERCE" />
                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <h1 className="updatePasswordHeading">Update Password</h1>
                        {/* updatePassword form start */}
                        <form
                            className="updatePasswordForm"
                            onSubmit={updatePasswordSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="signUpPassword">
                                {/* <p>Password</p> */}
                                <VpnKeyIcon/>
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    required
                                    name="password"
                                    value={oldPassword}
                                    onChange={(e)=>setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className="signUpPassword">
                                {/* <p>Password</p> */}
                                <LockOpenIcon/>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    name="password"
                                    value={newPassword}
                                    onChange={(e)=>setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="signUpPassword">
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
                            <input type="submit" value="Change" className="updatePasswordBtn" />
                        </form>
                        {/* updatePassword form end */}
                    </div>
                </div>
            </Fragment>)}
        </Fragment>
    )
}

export default UpdatePassword
