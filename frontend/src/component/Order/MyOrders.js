import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import Loader from "../layout/Loader/Loader.js";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@material-ui/data-grid";
import { Link, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import LaunchIcon from "@material-ui/icons/Launch";
import { clearErrors, myOrders } from "../../actions/orderAction.js";
// import { useParams } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrder);
  const alert = useAlert();
  // const params = useParams();

  const columns = [
    { field: "id", headerName: "Order Id", minWidht: 400, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidht: 150,
      flex: 0.5,
      cellClassName: (params) => params.getValue(params.id, "status") === "Delivered"
        ? "greenColor"
        : "redColor" // classes for make status color green or red (from app.css) 
    },
    {
      field: "itemsQty",
      headerName: "items quantity",
      type: "number",
      minWidht: 150,
      flex: 0.3,
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
      headerName: "Actions",
      type: "number",
      minWidht: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/order/${params.getValue(params.id, "id")}`}><LaunchIcon /></Link>
          </Fragment>
        );
      }
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length, // these all value we will get from redux store myOrder
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
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title={`${user.name} Orders - ECOMMERCE`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          {/* <DataGrid
            rows={rows}
            columns={columns}
            // rowsPerPageOptions={[10,15,20]}
            rowsPerPageOptions={[100]}
            // pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          /> */}


          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={15}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
            rowsPerPageOptions={[100]}
          />
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
