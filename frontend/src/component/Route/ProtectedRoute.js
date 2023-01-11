import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ Component, ...rest }) => {

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
        //                     return <Component {...props} />
        //                 }}
        //             />
        //         </Routes>
        //     )}
        // </Fragment>
        <Fragment>
            { !loading && 
                (isAuthenticated ? <Component /> : <Navigate to="/login" />)
            }

        </Fragment>
    )
}

export default ProtectedRoute