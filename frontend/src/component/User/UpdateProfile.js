import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearErrors, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';



const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector((state) => state.user);
    const { error, loading, isUpdated } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm)); // myform is passing as userdata to userAction.js 
    };

    const updateProfileDataChange = (e) => {
        // if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) { // reader have 3 states-> 0 for ready, 1 for processing, 2 for done
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        // }
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile updated successfully");
            dispatch(loadUser()); // load updated data 
            navigate(`/account`);
            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }
    }, [dispatch, error, alert, navigate, isUpdated, user])


    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                <MetaData title="Update Profile -- ECOMMERCE"/>
                <div className="updateProfileContainer">
                    <div className="updateProfileBox">
                        <h1 className="updateProfileHeading">Update Profile</h1>
                        {/* updateProfile form start */}
                        <form
                            className="updateProfileForm"
                            onSubmit={updateProfileSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="updateProfileName">
                                {/* <p>Name</p> */}
                                <PersonIcon/>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                            <div className="updateProfileEmail">
                                {/* <p>Email</p> */}
                                <EmailIcon/>
                                <input
                                    type="email"
                                    placeholder="abc@gmail.com"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>
                            <div id="updateProfileImage">
                                <img src={avatarPreview} alt="avatar-preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProfileDataChange}
                                />
                            </div>
                            <input type="submit" value="Update" className="updateProfileBtn" />
                        </form>
                        {/* updateProfile form end */}
                    </div>
                </div>
            </Fragment>)}
        </Fragment>
    )
}

export default UpdateProfile;