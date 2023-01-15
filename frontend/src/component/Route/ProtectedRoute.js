import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ isAdmin, Component, ...rest }) => {

    const { loading, isAuthenticated } = useSelector((state) => state.user);


    return (
        // <Fragment>

        //     {!loading && (
        //         <Routes>
        //             <Route
        //                 {...rest}
        //                 render={(props) => {
        //                     if (!isAuthenticated) {
        //                         return <Navigate to="/login" />
        //                     }
        //                     // if(isAdmin === true && user.role !== "admin")
        //                     // {
        //                     //     return <Navigate to="/login" />
        //                     // }
        //                     return <Component {...props} />
        //                 }}
        //             />
        //         </Routes>
        //     )}
        // </Fragment>

        <Fragment>
            { loading === false && 
                isAuthenticated === true  ? <Component /> : <Navigate to="/login" />
            }
        </Fragment>
    )
}

export default ProtectedRoute