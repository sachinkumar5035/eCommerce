import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
import SideBar from "./Sidebar.js";
import { Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { getUserDetails, updateUser, clearErrors } from "../../actions/userAction";
import { MdMailOutline, MdPerson, MdVerified } from "react-icons/md";
import Loader from "../layout/Loader/Loader";



const UpdateUser = () => {
    const params = useParams();
    const userId = params.id; // get the user id from the url 
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile); // from store 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        }
        else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("User updated successfully");
            navigate("/admin/users"); // redirect to users
            dispatch({ type: UPDATE_USER_RESET });
        }

    }, [dispatch, error, alert, navigate, isUpdated, updateError]);


    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        dispatch(updateUser(userId, myForm)); //call action method to update user 
    }


    return (

        <Fragment>
            <MetaData title="Update User -ECommerce" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {
                        loading ? (<Loader />) : (
                            <form
                                className="createProductForm"
                                onSubmit={updateUserSubmitHandler}
                            >
                                <h1>Update User</h1>

                                <div>
                                    <MdPerson />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <MdMailOutline />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <MdVerified />
                                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">Choose Category</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>


                                <Button
                                    id="createProductBtn"
                                    type="submit"
                                    disabled={updateLoading ? true : false || role === "" ? true : false}
                                >
                                    Update
                                </Button>
                            </form>
                        )
                    }
                </div>
            </div>
        </Fragment>

    );
};

export default UpdateUser;
