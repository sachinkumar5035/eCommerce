import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import Loader from "../layout/Loader/Loader.js";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@material-ui/data-grid";
import { Button, Link, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import LaunchIcon from "@material-ui/icons/Launch";
import { clearErrors, myOrders } from "../../actions/orderAction.js";
import { useNavigate } from "react-router-dom";





const MyOrders = () => {


  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrder);
  const alert = useAlert();
  
  const navigate = useNavigate();


  const editButtonHandler = (id) => {
    navigate(`/order/${id}`);
  }


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 300,
      flex: 0.5,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 312,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          // <Link to={`/order/${params.getValue(params.id, "id")}`}>
          //   <LaunchIcon />
          // </Link>
          <Button
            onClick={(e) => editButtonHandler(params.getValue(params.id, "id"))}
          >
            <LaunchIcon />
          </Button>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);
  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        
        <div className="myOrdersPage">
          <h1 id="myOrdersHeading">{user.name}'s Orders</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[100]}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
