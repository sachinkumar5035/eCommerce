import React,{Fragment,useState,useEffect} from 'react';
import "./ForgotPassword.css";
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors,forgotPassword } from '../../actions/userAction';


const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, message, loading } = useSelector((state) => state.forgotPassword); // pull error,message,loading from forgotPassword

    const [email,setEmail] = useState("");

    const forgotPasswordSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("email",email);
        dispatch(forgotPassword(myForm));
    }


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(message){
            alert.success(message);
        }
    }, [dispatch, error, alert,message])



  return (
    <Fragment>
    {loading ? <Loader /> : (<Fragment>
        <MetaData title="Forgot password -- ECOMMERCE"/>
        <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
                <h1 className="forgotPasswordHeading">Forgot Password</h1>
                {/* forgotPassword form start */}
                <form
                    className="forgotPasswordForm"
                    onSubmit={forgotPasswordSubmit}
                    encType="multipart/form-data"
                >
                    <div className="forgotPasswordEmail">
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
                    <input type="submit" value="Send" className="forgotPasswordBtn" />
                </form>
                {/* forgotPassword form end */}
            </div>
        </div>
    </Fragment>)}
</Fragment>
  )
}

export default ForgotPassword
