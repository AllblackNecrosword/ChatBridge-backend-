const Message = require("../Models/messageModel");

const getMessage=(req,res)=>{
    res.json("Get message")
}

const sentMessage=(req,res)=>{
    res.json("sent Message")
}

module.exports={
    getMessage,
    sentMessage,
}