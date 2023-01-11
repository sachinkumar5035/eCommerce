const nodeMailer = require("nodemailer"); 


// this function is used to reset password functionality
const sendEmail = async (options) =>{

    const transporter = nodeMailer.createTransport({
        host:process.env.SMTP_HOST, // differ by service
        port:process.env.SMTP_PORT, // differ by service
        service:process.env.SMTP_SERVICE, // name the service gmail, yahoo,outlook etc
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        },
    });
    
    const mainOptions = {
        from: process.env.SMTP_MAIL, // kiski mail id se mail jayega
        to: options.email, // kisko mail jayega which is passed from reset password function
        subject:options.subject, // mail subject kya hoga
        text: options.message, // mail text which is passed from resetpassword function 
    }

    // this function will send the mail containing all the mail parameters
    await transporter.sendMail(mainOptions);
}

module.exports = sendEmail;