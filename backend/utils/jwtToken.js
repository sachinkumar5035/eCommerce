// creating and saving token in cookkie

const sendToken =  (user,statusCode,res)=>{
    
    const token =  user.getJWTToken();

    // options for cookie
    const options={
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000 // to convert into millisecond
        ),
        httpOnly:true, // remove when using on local 
        // secure:true, // remove when using on local 
        // sameSite:"none" // remove when using on local 
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
      });
}


module.exports = sendToken;