const exppress = require('express');
const app = exppress();
const errMiddleWare = require('./middleware/error'); // import error middleware
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");



app.use(exppress.json());
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());


// route imports
const productRoute = require("./routes/productRoute"); // product route
const userRoute = require("./routes/userRoute"); // user route
const orderRoute = require("./routes/orderRoute"); // order routes

// API will be called as http://localhost:4000/api/v1/apiName
app.use("/api/v1",productRoute);  // product API   http://localhost:4000/api/v1/
app.use("/api/v1",userRoute); // user API http://localhost:4000/api/v1/
app.use("/api/v1",orderRoute); // order api will be called as-> http://localhost:4000/api/v1/


//  middleware for error
app.use(errMiddleWare);





// export statements
module.exports = app;