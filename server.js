const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Regroute=require("./route/registrationRoute")
const Form=require("./model/formModel")
const app = express();


const dbURL = "mongodb+srv://johnsegs:Johnsegs123@cluster0.ovzu5x7.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true })
  .then((result) =>
    app.listen("2000", () => {
      console.log(2000);
    })
  )
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.static("assets"));

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use("/api/register", Regroute);


app.get("/success/:id",async(req,res)=>{
    const {id}=req.params
    const exist =await Form.findOne({_id:id})
    if (exist){
        const name=exist.firstname+" " + exist.lastname
        res.render("successpage",{
            title:"Successfully registered",
            name:name
        })
    }
    else{
        res.send("You are not authorized to visit this page")
    }
})
app.get("/register",async(req,res)=>{
    res.render("regpage",{
        title:"Registration"
    })
})
app.get("/test",async(req,res)=>{
    res.render("test",{
        title:"Registration"
    })
})
app.get("/admin/:id",async(req,res)=>{
    const {id}=req.params
    if (id=="mayowa126"){

        const member=await Form.find().sort({createdAt:-1})
        res.render("admin",{
            title:"Admin",
            members:member
        })
    }
    else{
        res.send("You are no authorized to visit this page")
    }
})

