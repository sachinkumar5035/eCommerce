const express = require('express');
const app = express();
const errMiddleWare = require('./middleware/error'); // import error middleware
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(cors());


app.use(express.json());
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({extended:true,parameterLimit:1000000,limit:"100mb"}));
app.use(fileUpload({useTempFiles: true}));


dotenv.config({path:"backend/config/config.env"});


// route imports
const productRoute = require("./routes/productRoute"); // product route
const userRoute = require("./routes/userRoute"); // user route
const orderRoute = require("./routes/orderRoute"); // order route
const paymentRoute = require("./routes/PaymentRoute"); // payment route
const captchaRoute = require("./routes/capthcaRoute"); // captcha route


// API will be called as http://localhost:4000/api/v1/apiName
app.use("/api/v1",productRoute);  // product API   http://localhost:4000/api/v1/
app.use("/api/v1",userRoute); // user API http://localhost:4000/api/v1/
app.use("/api/v1",orderRoute); // order api will be called as-> http://localhost:4000/api/v1/
app.use("/api/v1",paymentRoute); // payment route will be called as-> http://localhost:400/api/v1/
app.use("/api/v1",captchaRoute); // captcha route



app.get("/",(req,res)=>res.send(`<h1>server is working.click<a href="${process.env.FRONTEND_URL}">here</a> to go to frontend</h1>`))

//  middleware for error
app.use(errMiddleWare);


// export statements
module.exports = app;