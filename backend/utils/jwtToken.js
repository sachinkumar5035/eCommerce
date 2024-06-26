// creating and saving token in cookkie

const sendToken =  (user,statusCode,res)=>{
    
    const token =  user.getJWTToken();
    // console.log("saving token",token);
    // options for cookie
    const options={
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000 // to convert into millisecond
        ),
        // httpOnly:true, // remove when using on local 
        // secure:true, // remove when using on local 
        // sameSite:"none" // remove when using on local 
    };
    res.cookie('token',token, options) // save cookie for 1 hr 
    res.status(statusCode).json({
        success: true,
        user,
        token,
      });
}


module.exports = sendToken;