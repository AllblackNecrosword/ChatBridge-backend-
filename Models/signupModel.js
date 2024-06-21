const mongoose = require("mongoose");

const Signup = mongoose.model("User",{
    username:{
        type:String,
        require:true,

    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        required:true,
    }
})

module.exports=Signup;
