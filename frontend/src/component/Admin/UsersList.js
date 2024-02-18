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
import {getAllUsers,clearErrors, deleteUser, updateProfile} from "../../actions/userAction.js";
import { DELETE_USER_RESET } from '../../constants/userConstants.js';




const UsersList = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  // const params = useParams();
  const navigate = useNavigate();
  const { error, users,loading } = useSelector((state) => state.allUsers);
  const {error:deleteError,isDeleted,message} = useSelector((state)=>state.profile);

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
      alert.success(message);
      navigate("/admin/users"); // redirect to admin users
      dispatch({type:DELETE_USER_RESET});
    }
    dispatch(getAllUsers());
  }, [error, dispatch, alert,deleteError,navigate,isDeleted,message]);


  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  }

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      flex: .5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 140,
      flex: 0.3,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
            ? "greenColor"
            : "redColor" // classes for make status color green or red (from app.css) 
    },
    },

    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}> {/* update user page */}
              <EditIcon />
            </Link>

            <Button
              onClick={(e) => deleteUserHandler(params.getValue(params.id, "id"))}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id:item._id,
        email: item.email,
        name: item.name,
        role: item.role,
      });
    });


  return (
    <Fragment>
      <MetaData title="All users --ECOMMERCE" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 className="productListHeading">All users</h1>
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

export default UsersList
