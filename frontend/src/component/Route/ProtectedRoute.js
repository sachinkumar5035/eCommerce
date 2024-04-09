import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ isAdmin, Component, ...rest }) => {

    const { loading, isAuthenticated } = useSelector((state) => state.user);
    return (
        <Fragment>
            { loading === false && 
                isAuthenticated === true  ? <Component /> : <Navigate to="/login" />
            }
        </Fragment>
    )
}

export default ProtectedRoute