const mongoose=require("mongoose")
const Schema=mongoose.Schema

const formData=new Schema({
    email:{
        type:String,
        require:true
    },
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    phoneno:{
        type:Number,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
})
const bootCamper = mongoose.model("bootCamper", formData);

module.exports = bootCamper;
