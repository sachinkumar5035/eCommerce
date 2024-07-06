import React, { Fragment, useEffect, useRef, useState } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearErrors, verifyRecaptcha } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from "@material-ui/icons/Lock";
import ReCAPTCHA from "react-google-recaptcha";
import VisibilityIcon from '@mui/icons-material/Visibility';
const V2_SITE_KEY = "6LeyseEpAAAAAJS-asoKVdC_Cpm_lXI_NG9dOizj";

const LoginSignUp = ({ history }) => {
    const loginTab = useRef(null); // can not access dom element in react directly that's is why using useRef
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const recaptchaRef = useRef(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [user, setUser] = useState({
        name: "",
        password: "",
        email: ""
    });
    const [isText,setIsText] = useState(false);
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const loginSubmit = async (e) => {
        e.preventDefault();
        const captchaValue = recaptchaRef?.current?.getValue();
        if (!captchaValue) {
            alert.error('Please verify the reCAPTCHA!');
        }
        else {
            const data = await verifyRecaptcha(captchaValue);
            if(data.success) {
                setIsVerified(true);
                dispatch(login(email, password));
            }else{
                alert.error('You are not human, Please verify the reCAPTCHA!');
            }
        }
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.append("file", avatar);
        dispatch(register(myForm)); // myform is passing as userdata to userAction.js 
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) { // reader have 3 states-> 0 for ready, 1 for processing, 2 for done
                    setAvatarPreview(reader.result);
                    // setAvatar(reader.result);
                    setAvatar(e.target.files[0]);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    //control comes here from checkout from cart page if user is logged in already then it will go to shipping page, otherwise it will go to login page 
    const redirect = location.search ? location.search.split("=")[1] : "/account";
    // need to get first or last string of location.search but not able to get the correct string 

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(redirect);
            // history.push(redirect);
        }
    }, [dispatch, error, alert, navigate, isAuthenticated, redirect, history])



    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                <div className="loginSignUpContainer">
                    <div className="loginSignupBox">
                        <div>
                            <div className="login_signup_toggle">
                                <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                                <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        {/* Login form start */}
                        <form disabled={isVerified} ref={loginTab} className="loginForm" onSubmit={loginSubmit}>
                            <div className="loginEmail">
                                <EmailIcon className="icon" />
                                <input
                                    type="email"
                                    placeholder="abc@gmail.com"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockIcon className="icon" />
                                <input
                                    type={isText ? "Text" : "Password"}
                                    placeholder="password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                                <VisibilityIcon onClick={()=>setIsText(!isText)}/>
                            </div>
                            <Link to="/password/forgot">Forgot password</Link>
                            <input type="submit" value="Login" className="loginBtn" />
                            <ReCAPTCHA ref={recaptchaRef} sitekey={V2_SITE_KEY}/>
                        </form>
                        {/* Login form end */}

                        {/* Register form start */}
                        <form
                            ref={registerTab}
                            className="signUpForm"
                            onSubmit={registerSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="signUpName">
                                {/* <p>Name</p> */}
                                <PersonIcon className="icon" />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpEmail">
                                {/* <p>Email</p> */}
                                <EmailIcon className="icon" />
                                <input
                                    type="email"
                                    placeholder="abc@gmail.com"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpPassword">
                                {/* <p>Password</p> */}
                                <LockIcon className="icon" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div id="registerImage">
                                <img src={avatarPreview} alt="avatar-preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <input type="submit" value="Register" className="signUpBtn" />
                        </form>
                        {/* register form end */}
                    </div>
                </div>
            </Fragment>)}
        </Fragment>
    );
};

export default LoginSignUp;
