const mongoose = require('mongoose');
//const mongoURI = "mongodb://localhost:27017/eCommerce" // eCommerce db will be used in this application

// function which connnects to database 
const connectToMongo=()=>{
    mongoose.connect(process.env.DB_URI,()=>{
        console.log("connected to mongo successfully");
    })
}

module.exports = connectToMongo;