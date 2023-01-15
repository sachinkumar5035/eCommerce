import { Button } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import Sidebar from "./Sidebar.js"
import "./ProductList.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@material-ui/data-grid";
import {
    clearErrors,
    getAdminProducts,
    // deleteProduct,
  } from "../../actions/productAction";

const ProductList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const {error,products} = useSelector((state)=>state.products);
   
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAdminProducts());

    },[error,dispatch,alert]);



    

const deleteProductHandler = ()=>{

}

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 300,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 140,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 200,
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
                <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
    
                <Button
                  onClick={() =>
                    deleteProductHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </Fragment>
            );
          },
        },
      ];

      const rows=[];

      products && 
      products.forEach((item)=>{
        rows.push({
            id:item._id,
            stock:item.stock,
            price:item.price,
            name:item.name,
        });
      });


  return (
    <Fragment>
        <MetaData title="All products --ECOMMERCE"/>
        <div className="dashboard">
            <Sidebar/>
            <div className="productListContainer">
                <h1 className="productListHeading">All products</h1>
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

export default ProductList
