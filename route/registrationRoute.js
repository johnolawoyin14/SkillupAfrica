const express = require("express");
const Form = require("../model/formModel");
const nodemailer=require("nodemailer")

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "skillupafrica9@gmail.com",
    pass: "edpw aipu fwgp rawg ",
  },
});

router.post("/",async(req,res)=>{
    const {email,firstname,lastname,age,gender,phoneno}=req.body
    let title=null
    if (gender=="male"){
        title="Mr"
    }
    else{
        title="Mrs"

    }
    const mailOptions = {
      from: "Skillup Africa", // sender address
      to: [email], // list of receivers
      subject: "Successful registration @ Skillup Africa", // Subject line
      text: "Hello world?", // plain text body
      html: `<div style="width: 300px; height: 500px; margin: auto; background-color: purple;">
 <br>
<p style="color: white; text-align: center;">${title} ${firstname} ${lastname}</p>
<p style="color: white; text-align: center;">
You have successfully registered for Skillup Africa 2023 <br>cohort1 bootcamp
</p>

<p style="color: white; text-align: center;">
For more enquires: <br> Contact :<a href="tel:0806 807 9730" style="color: white;">Call us now!</a>
</p>
</div>`, // html body
    };
    const sendmail = async (mailOption, transporter) => {
      try {
        await transporter.sendMail(mailOption);
      } catch (error) {
        console.log(error);
      }
    };
    try{
        if (!email || !firstname || !lastname || !age || !gender || !phoneno){
   
            throw Error("Incomplete field")
}
else{ const exist=await Form.findOne({email})
    if (exist ){
        throw Error(`a user already registered with ${email}`)
    }
    else{
        sendmail(mailOptions,transporter)
        const register= await Form.create(req.body)
        res.json({redirect:`/success/${register._id}`})
    }
}
    }
    catch(error){
        console.log(error.message)
        res.status(400).json({"error":error.message})
  
}
})


module.exports=router