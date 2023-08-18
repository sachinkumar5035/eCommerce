const app = require("./app");
const dotenv = require('dotenv');
const connectToMongo = require("./config/database");
const cloudinary = require("cloudinary"); // for user data upload 




//handling uncaugnt error
process.on("uncaughtException",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaugnt error`);
    process.exit(1);
});

//config 
dotenv.config({path:"config/config.env"});


// connect to database(mongoDB)
connectToMongo(); // calling the function to connect to database mongodb


// setting up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://192.168.0.100:${process.env.PORT}`);
})

// unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server unhandeled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });

});