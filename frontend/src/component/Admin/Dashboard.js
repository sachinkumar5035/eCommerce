import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import {Line,Doughnut} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 

const Dashboard = () => {
    
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, 5000],
          },
        ],
      };

      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [10, 80],
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
                <p>50</p>
            </Link>
            <Link to="/admin/orders">
                <p>Orders</p>
                <p>4</p>
            </Link>
            <Link to="/admin/users">
                <p>Users</p>
                <p>900</p>
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
