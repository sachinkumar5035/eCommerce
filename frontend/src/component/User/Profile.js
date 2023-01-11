import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import "./Profile.css";

const Profile = () => {

    const { user,loading, isAuthenticated } = useSelector((state) => state.user); // pulling user from state
    const navigate = useNavigate();
    

    useEffect(()=>{
        if(!isAuthenticated){ // is not logged in
            navigate("/login"); // redirect to login page
        }
       
    },[navigate,isAuthenticated]);

    return (
        <Fragment>
            {loading ? <Loader /> : (<Fragment>
                <MetaData title={`${user.name}'s Profile`} />
                
                <div className="profileContainer">
                    {/* left div start */}
                    <div>
                        <h1>My profile</h1>
                        {/* <img src="/Profile.png" alt={user.name} /> */}
                        <img src={user.avatar.url} alt={user.name} />
                        <Link to="/me/update"> Edit profile</Link>
                    </div>
                    {/* left div end */}

                    {/* right div start */}
                    <div>
                        <div>
                            <h4>Full Name</h4>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h4>Joined on</h4>
                            <p>{String(user.createdAt).substr(0, 10)}</p>
                        </div>
                        <div>
                            <Link to="/orders">My Orders</Link>
                            <Link to="/password/update">Password update</Link>
                        </div>
                    </div>
                    {/* right div end */}
                </div>
            </Fragment>)}
        </Fragment>
    )
}

export default Profile
