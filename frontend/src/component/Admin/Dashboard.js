import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import {Line,Doughnut} from "react-chartjs-2";
// eslint-disable-next-line
import Chart from 'chart.js/auto';
// eslint-disable-next-line
import {CategoryScale} from 'chart.js'; 
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProducts,
  // deleteProduct,
} from "../../actions/productAction";

const Dashboard = () => {


  const {products} = useSelector((state)=>state.products);
  const dispatch = useDispatch();

  let outOfStock = 0;
  products &&
    products.forEach((item)=>{
      if(item.stock===0){
        outOfStock+=1;
      }
    });


    useEffect(()=>{
      dispatch(getAdminProducts());
  },[dispatch]);
    
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0,40000],
          },
        ],
      };

      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock,products.length-outOfStock],
          },
        ],
      };

      useEffect(()=>{
      },[])

  return (
    <div className='dashboard'>
    <Sidebar/>
    <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummery">
            <div>
            <p>Total amount<br/> 2000</p>
            </div>
        </div>
        <div className="dashboardSummeryBox2">
            <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
                <p>Orders</p>
                <p>4</p>
            </Link>
            <Link to="/admin/users">
                <p>Users</p>
                <p>80</p>
            </Link>
        </div>


        <div className="lineChart">
            <Line
                data={lineState}
            />
        </div>

        <div className="doughnutChart">
            <Doughnut data={doughnutState}/>
        </div>

    </div>
    </div>
  )
}

export default Dashboard
