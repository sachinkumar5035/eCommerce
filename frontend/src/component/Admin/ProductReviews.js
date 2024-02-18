import { Button } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "./Sidebar.js"
import "./ProductReviews.css";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@material-ui/data-grid";
import {
    clearErrors,
    getAllReviews,
    deleteReview,
} from "../../actions/productAction.js";
import { DELETE_REVIEW_RESET } from '../../constants/productConstant.js';
import { MdStar } from 'react-icons/md';







const ProductReviews = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();
    const { error, reviews,loading } = useSelector((state) => state.productReviews);
    const { error: deleteError, isDeleted } = useSelector((state) => state.review);

    const [productId,setProductId] = useState("");



    useEffect(() => {
        if(productId.length === 24){
            dispatch(getAllReviews(productId)); // no need to click the button
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Review deleted successfully");
            navigate("/admin/reviews"); // redirect to admin reviews page
            dispatch({ type: DELETE_REVIEW_RESET });
        }
        dispatch(getAllReviews());
    }, [error, dispatch, alert, deleteError, navigate, isDeleted,productId]);


    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReview(reviewId,productId));
    }

    const productReviewsSubmitHandler=(e)=>{
        e.preventDefault();
        dispatch(getAllReviews(productId)); // get all reviews of a product 
    }



    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.8 },

        {
            field: "user",
            headerName: "User",
            // type: "number",
            minWidth: 180,
            flex: 0.4,
        },

        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },


        {
            field: "rating",
            headerName: "Rating",
            minWidth: 130,
            flex: 0.4,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "greenColor"
                    : "redColor" // classes for make status color green or red (from app.css) 
            },
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 130,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        {/* <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link> */}

                        <Button
                            onClick={(e) => deleteReviewHandler(params.getValue(params.id, "id"))}
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                user: item.name,
                comment: item.comment,
                rating: item.rating,
            });
        });


    return (
        <Fragment>
        <MetaData title={`ALL REVIEWS - Admin`} />
  
        <div className="dashboard">
          <Sidebar />
          <div className="productReviewsContainer">
            <form
              className="productReviewsForm"
              onSubmit={productReviewsSubmitHandler}
            >
              <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
  
              <div>
                <MdStar />
                <input
                  type="text"
                  placeholder="Product Id"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>
  
              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  loading ? true : false || productId === "" ? true : false
                }
              >
                Search
              </Button>
            </form>
  
            {reviews && reviews.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            ) : (
              <h1 className="productReviewsFormHeading">No Reviews Found</h1>
            )}
          </div>
        </div>
      </Fragment>
    )
}

export default ProductReviews;
