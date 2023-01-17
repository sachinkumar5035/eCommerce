import { Button } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from "./Sidebar.js"
import "./ProductList.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@material-ui/data-grid";
import { deleteOrder, getALlOrders,clearErrors } from '../../actions/orderAction.js';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants.js';




const OrderList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();
    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
          alert.error(deleteError);
          dispatch(clearErrors());
        }
        if(isDeleted){
          alert.success("Order deleted successfully");
          dispatch({type:DELETE_ORDER_RESET});
          navigate("/admin/orders"); // redirect to admin dashboard
        }
        dispatch(getALlOrders());
    }, [error, dispatch, alert, deleteError, navigate, isDeleted]);





    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    const columns = [
        { field: "id", headerName: "Order Id", minWidht: 400, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidht: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor" // classes for make status color green or red (from app.css) 
            },
        },
        {
            field: "itemsQty",
            headerName: "items quantity",
            type: "number",
            minWidht: 200,
            flex: 0.5,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidht: 200,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 100,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={(e) => deleteOrderHandler(params.getValue(params.id, "id"))}
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });


    return (
        <Fragment>
            <MetaData title="All orders --ECOMMERCE" />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 className="productListHeading">All Orders</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={15}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                        rowsPerPageOptions={[100]}
                    />
                </div>
            </div>
        </Fragment>
    )
}


export default OrderList;
